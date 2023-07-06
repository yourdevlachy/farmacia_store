import { version, description } from '../../../package.json'

export const SystemBLL = {
  HealthCheck: (req, res) => {
    res.status(200).json('It works!')
  },
  SystemVersion: (req, res) => {
    res.status(200).json(`${version}`)
  },
  GetHome: (req, res) => {
    const welcomeJSON = {
      message: 'Welcome to the API Chat',
      description: description,
      version: version,
    }
    const messageToShow = `
    <div style="margin-left: 10px">
      <h1>${welcomeJSON.message}</h1>
      <span"><h3>Description:</h3>${welcomeJSON.description}</span>
      <span"><h3>Version:</h3>${welcomeJSON.version}</span>
    </div>`
    res.send(messageToShow)
  },
}
