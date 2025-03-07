import { useEffect, useState } from 'react'

function App() {
  const [formValues, setFormValues] = useState({
    username : '',
    password : ''
  })
  const [validated, setValidated] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  function validateForm(formValues) {
    const errors = {};
    if (!formValues.username) {
        errors.username = 'Name field is required'
    }

    if (!formValues.password) {
        errors.password = 'Password field is required'
    }

    return errors;
  }

  function handleSubmit(e){
    e.preventDefault();
    const erros = validateForm(formValues);
    setFormErrors(erros)
    if (Object.keys(erros).length === 0) {
      setValidated(true)
    }
  }

  function handleOnChange(e) {
    const {name, value} = e.target
    setFormValues({...formValues, [name] : value})
    
  }

  useEffect(() => {
    async function sendData() {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
    }

    if (validated){
      sendData();
      setFormValues({ username: '', password: '' });
    }

    
  }, [validated])



  return (
    <>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit} action="" method="post">
        <label htmlFor="username">Username</label>
        <input value={formValues.username} onChange={handleOnChange} type="text" name="username" id="username" />
        {formErrors.username && !validated && <p>{formErrors.username}</p>}
        <label htmlFor="password">Password</label>
        <input value={formValues.passwordd} onChange={handleOnChange} type="password" name="password" id="password" />
        {formErrors.password && !validated && <p>{formErrors.password}</p>}
        <button>Submit</button>
      </form>
    </>
  )
}

export default App
