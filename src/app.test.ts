// process.argv = ['node', 'app.ts', '-b','5']
// import './app'
import { ServerApp } from './presentacion/server-app';


describe('Test App.ts', () => {
  test('should call Server.run with values', async () => {

    const serverMock = jest.fn()

    ServerApp.run = serverMock
    process.argv = ['node', 'app.ts', '-b', '5', '-l', '7', '-s', '-d', 'test-destination', '-n', 'test-filename']

    await import('./app')

    expect(serverMock).toHaveBeenCalledWith(
      {
        base: 5,
        destination: "test-destination",
        fileName: "test-filename",
        limit: 7,
        showTable: true
      }
    )
  })

})
