import {useState, useEffect} from 'react'
import Header from './components/Header'

import './App.css'

//This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [failure, setFailure] = useState(false)
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    setIsLoading(true)
    try {
      const url = `https://apis.ccbp.in/ps/projects?category=${selectedCategory}`
      const response = await fetch(url)
      const data = await response.json()

      setProjects(data.projects)
      setIsLoading(false)
    } catch (error) {
      setFailure(false)
      setIsLoading(false)
    }
  }

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
    fetchProject()
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <p data-testid="loader">loading</p>
      ) : failure ? (
        <div className="failCont">
          <img
            className="failImg"
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
          />
          <h1>oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button">Retry</button>
        </div>
      ) : (
        <div>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="op"
          >
            {categoriesList.map(each => (
              <option value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          <div className="op1">
            {projects.map(project => (
              <div key={project.id} className="projectCard">
                <img
                  alt={project.name}
                  className="imp"
                  src={project.image_url}
                />
                <h2>{project.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
