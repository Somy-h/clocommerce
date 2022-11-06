import Directory from '../directory/directory-component'

export default function Home(props) {
  return (
    <Directory categories={props.categories} />
  )
}