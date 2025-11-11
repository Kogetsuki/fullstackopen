import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Layout Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

export const Navigation = styled.nav`
  background: #2c3e50;
  padding: 1rem;
  margin-bottom: 2rem;
`

export const NavList = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #3498db;
  }
`

// Form Components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 1rem 0;
`

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: bold;
`

// Button Components
export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.primary ? '#3498db' : '#ecf0f1'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-top: 1em;
  max-width: 20em;
  &:hover {
    background: ${props => props.primary ? '#2980b9' : '#bdc3c7'};
  }
`

export const DangerButton = styled(Button)`
  background: #e74c3c;
  color: white;
  &:hover {
    background: #c0392b;
  }
`

// Blog Components
export const BlogCard = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

export const BlogTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`

export const BlogInfo = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`

// Table Components
export const Table = styled.div`
  display: table;
  width: 100%;
  margin-top: 0.5rem;
  border-collapse: collapse;
  background: white;
  border-radius: 4px;
  overflow: hidden;
`

export const TableHeader = styled.div`
  display: table-row;
  font-weight: bold;
  text-align: left;
  font-size: 0.95rem;
  background: #f8f9fa;
`

export const TableRow = styled.div`
  display: table-row;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:hover {
    background: #e9ecef;
  }
`

export const TableCell = styled.div`
  display: table-cell;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border-bottom: 1px solid #dee2e6;
`

// Notification Components
export const Notification = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background: ${props => props.type === 'error' ? '#fee2e2' : '#dcfce7'};
  color: ${props => props.type === 'error' ? '#dc2626' : '#16a34a'};
`

// Typography
export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`

export const Subtitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`

// Comment Components
export const CommentSection = styled.div`
  margin-top: 2rem;
`

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`

export const CommentItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`