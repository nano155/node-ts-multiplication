import { CreateTable } from './create-table.use-case';

describe('createTableUseCase', () => {
    test('should create table with default values', () => {




        const createTable = new CreateTable()

        const table = createTable.execute({ base: 2 })
        const row = table.split('\n').length


        expect(createTable).toBeInstanceOf(CreateTable)
        expect(table).toContain('2 X 1 = 2')
        expect(table).toContain('2 X 2 = 4')
        expect(row).toBe(10)
    })

    test('should create table with custom values', () => {

        const createTable = new CreateTable()

        const options = {
            base: 3,
            limit: 20,
        }


        const table = createTable.execute(options)

        const row = table.split('\n').length

        expect(table).toContain('3 X 1 = 3')
        expect(table).toContain('3 X 2 = 6')
        expect(row).toBe(20)
    })



})
