import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';


describe('Server App', () => {

    
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        fileName: 'test-filename'
    }
  
    test('should create ServerApp intance', () => {
      
        const serverApp = new ServerApp()
        

        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function')
    })

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log')

        const createtableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')


        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledWith('Server running...')
        expect(logSpy).toHaveBeenLastCalledWith('File created!')

        expect(createtableSpy).toHaveBeenCalledTimes(1)
        expect(createtableSpy).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})

        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            destination: options.destination,
            fileContent: expect.any(String),
            fileName: options.fileName 
        })
    })

    test('should run with custom values mocked', () => {

        const logError = jest.fn()
        const logMock = jest.fn()
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveMock = jest.fn().mockReturnValue(true)

        console.error = logError
        console.log = logMock
        SaveFile.prototype.execute = saveMock
        CreateTable.prototype.execute = createMock

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('Server running...')
        expect(createMock).toHaveBeenCalledWith({
            base:options.base,
            limit:options.limit
        })
        expect(saveMock).toHaveBeenCalledWith({
            destination: options.destination,
            fileContent:  '1 x 2 = 2',
            fileName: options.fileName,
        })
        expect(logMock).toHaveBeenCalledWith('File created!')
        expect(logError).not.toHaveBeenCalled()
      
    })
    
    
    
})
