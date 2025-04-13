const BoardPlaceHolder = () => {
    const dummyBoards = new Array(4);
    console.log(dummyBoards)
  return (
    <div className='flex flex-col gap-6 mt-4'>
        <div className='w-full h-12 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
        <div className='w-full h-60 animate-pulse rounded bg-gray-200 dark:bg-dark-secondary'></div>
    </div>
  )
}

export default BoardPlaceHolder