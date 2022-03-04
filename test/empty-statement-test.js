module.exports = function (test) {
    test(';', {
        type: 'Program',
        body: [{
            type: 'EmptyStatement',
        }]
    })
}