const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('Url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()

  await page.locator('.blog', { hasText: title }).waitFor()
}

const expandAllBlogs = async (page) => {
  while (true) {
    const viewButton = page.getByRole('button', { name: 'View' }).first()
    const count = await page.getByRole('button', { name: 'View' }).count()
    if (count === 0)
      break
    await viewButton.click()
  }
}

export {
  loginWith,
  createBlog,
  expandAllBlogs
}