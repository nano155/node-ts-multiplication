import { SaveFile } from './save-file.use-case';
import fs from 'fs'

describe('saveFileUseCase', () => {
   
    const options = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }


    afterEach(()=>{
        const exist = fs.existsSync('outputs')
        if(exist) fs.rmSync('outputs', {recursive: true})

        const customFileExist = fs.existsSync('custom-outputs')
        if(customFileExist) fs.rmSync('custom-outputs', {recursive: true})
    })


    test('should save file with default values', () => {
      
        const saveFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options)

        const checkFile = fs.existsSync(filePath)
        
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
        
        expect(result).toBeTruthy()
        expect( checkFile).toBeTruthy
        expect(fileContent).toBe(options.fileContent)

    })

    test('should save file with custom values', () => {
        const saveFile = new SaveFile()

        const path = `${options.destination}/${options.fileName}.txt`
        const result = saveFile.execute(options)
        const checkFile = fs.existsSync(path)
        const fileContent = fs.readFileSync(path, {encoding: 'utf-8'})

        expect(result).toBeTruthy()
        expect( checkFile).toBeTruthy
        expect(fileContent).toBe(options.fileContent)
      
    })

    test('should return false if diectory could no be created', () => {
        const saveFile = new SaveFile()
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation( ()=>{
           throw new Error('This is error') 
        }) 
        const result = saveFile.execute(options)
        
        expect( result ).toBeFalsy()
        
        mkdirSpy.mockRestore()

    })


    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile()
        
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation( ()=>{
           throw new Error('This is error') 
        }) 

        const result = saveFile.execute({fileContent: 'Hola'})
        
        expect( result ).toBeFalsy()
        

        writeFileSpy.mockRestore()
    })
  
})
