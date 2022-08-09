exports.sukses = function (message,data) {
    if (data) {
        return ({'statusCode':'000','message':message, 'data':data})
    } else {
        return ({'statusCode':'000','message':message})
    }
}

exports.gagal = function (message,data) {
    if (data) {
        return ({'statusCode':'111','message':message, 'data':data})
    } else {
        return ({'statusCode':'111','message':message})
    }
}