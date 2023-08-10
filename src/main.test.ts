describe('main', () => {
  it('should output a message', async () => {
    console.log = jest.fn();

    require('./main');

    expect(console.log).toBeCalledWith('hello world');
  });
});
