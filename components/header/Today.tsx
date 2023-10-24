export const Today = () => {
  return (
    <p className=" text-md ml-5">
      {new Date().toLocaleDateString('fr-fr', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </p>
  )
}

export default Today
