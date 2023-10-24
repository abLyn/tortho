export const Today = () => {
  return (
    <p className=" text-sm text-center font-semibold">
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
