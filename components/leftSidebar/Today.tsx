export const Today = () => {
  return (
    <>
      <p className="lg:block hidden text-sm text-center font-semibold px-4">
        {new Date().toLocaleDateString('fr-fr', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="block lg:hidden text-sm text-center font-semibold">
        {new Date().toLocaleDateString('fr-fr', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
    </>
  )
}

export default Today
