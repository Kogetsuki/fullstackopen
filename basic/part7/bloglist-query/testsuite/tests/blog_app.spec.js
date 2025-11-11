const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, expandAllBlogs, refreshBlogs } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credential', async ({ page }) => {
      await loginWith(page, 'Wrong', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(page.getByText('Wrong wrong logged in')).not.toBeVisible()
    })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test blog', 'Playwright', 'http://playwrightblog.com')
      await expect(page.locator('.blog', { hasText: 'Test blog' })).toBeVisible()
    })

    describe('a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test blog', 'Playwright', 'http://playwrightblog.com')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        const likesDiv = page.locator('text=likes')
        const initialLikesText = await likesDiv.textContent()
        const initialLikes = parseInt(initialLikesText.match(/\d+/)[0])
        await page.getByRole('button', { name: 'Like' }).click()

        await expect(likesDiv).toContainText(`likes ${initialLikes + 1}`)
      })

      test('a blog can be deleted by who created it', async ({ page }) => {
        const blogLocator = page.locator('.blog', { hasText: 'Test blog' })
        await page.getByRole('button', { name: 'View' }).click()
        page.once('dialog', async dialog => {
          await dialog.accept() // confirm the deletion
        })
        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(blogLocator).not.toBeVisible()
      })

      test('only the user who created the blog sees its delete button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await request.post('/api/users', {
          data: {
            name: 'Other user',
            username: 'otheruser',
            password: 'password'
          }
        })
        await loginWith(page, 'otheruser', 'password')
        await page.getByRole('button', { name: 'View' }).click()

        await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })
    })

    describe('multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Least liked blog', 'Author A', 'http://a.com')
        await createBlog(page, 'Medium liked blog', 'Author B', 'http://b.com')
        await createBlog(page, 'Most liked blog', 'Author C', 'http://c.com')
      })

      test.only('blogs are ordered by number of likes descendingly', async ({ page, request }) => {
        await expandAllBlogs(page)

        // Like blogs different numbers of times
        const blogs = [
          { title: 'Least liked blog', likes: 1 },
          { title: 'Medium liked blog', likes: 3 },
          { title: 'Most liked blog', likes: 5 }
        ]

        for (const { title, likes } of blogs) {
          const blog = page.locator('.blog', { hasText: title })
          const likeButton = blog.getByRole('button', { name: 'Like' })

          for (let i = 0; i < likes; i++)
            await likeButton.click()
        }

        await page.waitForFunction(() => {
          const blogs = Array.from(document.querySelectorAll('.blog'))
          return blogs[0]?.textContent.includes('Most liked blog')
        })

        // Collect blogs in displayed order
        const blogTitles =
          await page.$$eval('.blog .blog-title', blogs =>
            blogs.map(b => b.textContent))

        // Test order
        expect(blogTitles[0]).toContain('Most liked blog')
        expect(blogTitles[1]).toContain('Medium liked blog')
        expect(blogTitles[2]).toContain('Least liked blog')
      })
    })
  })
})