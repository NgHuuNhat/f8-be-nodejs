module.exports = {
    listToObjectCustom: function (data) {
        return data.map(data => data.toObject())
    },

    detailToObjectCustom: function (data) {
        return data ? data.toObject() : data
    }
}