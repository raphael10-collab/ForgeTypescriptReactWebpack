import * as React from 'react'

export default function App() {
  React.useEffect(() => {


    return () => { // clean-up function
    }
  }, [])

  return (
    <div className='container'>
      <h1 className='heading'>
          Got it Finally!!
      </h1>


    </div>
  );
}
