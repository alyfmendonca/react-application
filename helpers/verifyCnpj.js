const verifyCnpj = async (cnpj, model) => {
    if (!cnpj || !model) return;
    return model.findOne({ cnpj })
        .then((user) => Boolean(user))
        .catch((err) => err);
};

module.exports = verifyCnpj;