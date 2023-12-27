
const Product = require('../model/product')

const getAllProductStatic = async (req, res) => {
    // const search = 'ab'
    const products  = await Product.find({price: {$gt: 30}})/* .sort("price").select('name price').limit(10).skip(2) */
     res.status(200).json({products ,nbHits: products.length})
}
const getAllProduct = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query
    queryObject = {}
    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i' }
    }
   
    // Numeric Filters
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-` )
        
        const options = ['price', 'rating'] 
        filters = filters.split(',').forEach((item) => {
            const [field, operators, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operators]: Number(value)}
            }
        });
    }


     console.log(queryObject)
     var result =  Product.find(queryObject)
    // Sort
    if(sort){
        // console.log(sort)
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result =result.sort("createdAt")
    }

    // Select
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 1
    // const skip = (page - 1) * limit 

    // result = result.skip(skip).limit(limit)
    const products = await result
    // console.log(req.query)
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProduct, getAllProductStatic}