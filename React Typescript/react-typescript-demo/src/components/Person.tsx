type PersonProps = {
  name: {
    first: string
    last: string
  }
}

export const Person = ({ name }: PersonProps) => {
  return (
    <h2>
      {name.first} {name.last}
    </h2>
  )
}
