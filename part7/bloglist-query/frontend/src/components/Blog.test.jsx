import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('<Blog />', () => {
  const testUser = {
    username: "Tester",
    name: 'The best tester',
    password: 'tester'
  }

  const testBlog = {
    title: 'The test blog',
    author: 'Tester',
    url: 'http://thisisatest.com',
    likes: 10,
    user: testUser
  }

  beforeEach(() => {
    blogService.update.mockResolvedValue({
      ...testBlog,
      likes: testBlog.likes + 1
    })

    render(<Blog blog={testBlog} user={testUser} />)
  })

  test('renders title and author but not url or likes by default', () => {
    expect(screen.getByText(/The test blog/i)).toBeVisible()
    expect(screen.getByText(/Tester/i)).toBeVisible()

    expect(screen.queryByText(/http:\/\/thisisatest.com/i)).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()
  })

  test('shows url and likes when clicking View', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    expect(screen.getByText(/http:\/\/thisisatest.com/i)).toBeVisible()
    expect(screen.getByText(/likes/i)).toBeVisible()
  })

  test('clicking like button twice calls blogService.update twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})
