// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(), // создаем мок-функцию
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(), // создаем мок-функцию
}));

jest.mock('path', () => ({
  join: jest.fn(), // создаем мок-функцию
}));

describe('doStuffByTimeout', () => {
  let spySetTimeOut: any
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    spySetTimeOut = jest.spyOn(global, 'setTimeout')
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn()
    doStuffByTimeout(callback, 1000)
    expect(spySetTimeOut).toHaveBeenCalledWith(callback, 1000)
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn()
    doStuffByTimeout(callback, 1000)
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  });
});

describe('doStuffByInterval', () => {
  let spySetInterval: any
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() =>{
    spySetInterval = jest.spyOn(global, 'setInterval')

  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn()
    doStuffByInterval(callback, 1000)
    expect(spySetInterval).toHaveBeenCalledWith(callback, 1000)
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn()
    doStuffByInterval(callback, 1000)
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  });
});

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    const fileName = 'file.txt';

    await readFileAsynchronously(fileName);

    expect(path.join).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const fileName = 'file.txt';

    const result = await readFileAsynchronously(fileName);

    expect(result).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const content = 'file content';
    const fileName = 'file.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously(fileName);

    expect(result).toEqual(content);
  });
});