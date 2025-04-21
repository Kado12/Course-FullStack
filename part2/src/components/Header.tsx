type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <h2>{title}</h2>
  )
}

export default Header