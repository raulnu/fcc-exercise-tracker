test('should create a user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'test'})
    })
    const result = await response.json();
    expect(result.username).toBe('test');
    expect(typeof result._id).toBe('string')
});

test('should create another user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'shupri'})
    })
    const result = await response.json();
    expect(result.username).toBe('shupri');
    expect(typeof result._id).toBe('string')
});

test('should get users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const result = await response.json();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).not.toBe(0);
    console.log(result)
});

test('should add exercises', async () => {
    const response = await fetch('http://localhost:3000/api/users/0/exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: 'test', duration: 10})
    })
    const result = await response.json();
    console.log(result)
    expect(result.username).toBe('test');
    expect(result.description).toBe('test');
    expect(result.duration).toBe(10);
    expect(result.date).not.toBe(undefined);
    const response2 = await fetch('http://localhost:3000/api/users/0/exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: 'test', duration: 10, date: '2020-01-01'})
    })
    const response3 = await fetch('http://localhost:3000/api/users/0/exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: 'test', duration: 10, date: '2020-01-05'})
    })
})

test('should get user logs', async () => {
    const response = await fetch('http://localhost:3000/api/users/0/logs');
    const result = await response.json();
    console.log(result)
    expect(result.count).toBe(3);
    expect(Array.isArray(result.log)).toBe(true);
    expect(result.log.length).toBe(3);
    expect(result.log[0].description).toBe('test');
    expect(result.log[0].duration).toBe(10);
    expect(result.log[0].date).not.toBe(undefined);
})

test('should get user logs with limit', async () => {
    const response = await fetch('http://localhost:3000/api/users/0/logs/?from=2020-01-01&to=2020-01-05');
    const result = await response.json();
    console.log(result)
    expect(result.count).toBe(3);
    expect(Array.isArray(result.log)).toBe(true);
    expect(result.log.length).toBe(2);
    expect(result.log[0].description).toBe('test');
    expect(result.log[0].duration).toBe(10);
    expect(result.log[0].date).not.toBe(undefined);
})