import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog with correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/Title/i)
    const authorInput = screen.getByLabelText(/Author/i)
    const urlInput = screen.getByLabelText(/Url/i)
    const createButton = screen.getByRole('button', { name: /Create/i }) // <--- fixed

    await user.type(titleInput, 'New Blog Title')
    await user.type(authorInput, 'John Doe')
    await user.type(urlInput, 'http://example.com')

    await user.click(createButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)

    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'New Blog Title',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 0
    })
  })
})
