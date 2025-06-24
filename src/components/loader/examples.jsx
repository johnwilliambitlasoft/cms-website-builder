import React from 'react'
import Loader from '../loader'

const LoaderExamples = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Loader Examples</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Basic Spinner (Medium - Default)</h2>
        <Loader />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Small Spinner</h2>
        <Loader size="sm" />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Large Spinner</h2>
        <Loader size="lg" />
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Default Color (--green variable)</h2>
        <Loader /> {/* Uses var(--green) from CSS variables */}
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Custom Color</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Loader color="#3182ce" /> {/* Blue */}
          <Loader color="#e53e3e" /> {/* Red */}
          <Loader color="#38a169" /> {/* Green */}
          <Loader color="#d69e2e" /> {/* Yellow */}
        </div>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>With Text</h2>
        <Loader text="Loading..." />
      </section>
      
      <section>
        <h2>Full-screen Overlay Example</h2>
        <p>Click the button to see the overlay spinner for 3 seconds</p>
        <OverlayExample />
      </section>
    </div>
  )
}

// Example of using the overlay spinner with a button
const OverlayExample = () => {
  const [showOverlay, setShowOverlay] = React.useState(false)

  const handleClick = () => {
    setShowOverlay(true)
    setTimeout(() => {
      setShowOverlay(false)
    }, 3000)
  }

  return (
    <>
      <button 
        onClick={handleClick}
        style={{
          padding: '8px 16px',
          backgroundColor: 'var(--green)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Show Overlay Spinner
      </button>
      {showOverlay && <Loader overlay text="Loading, please wait..." />}
    </>
  )
}

export default LoaderExamples
