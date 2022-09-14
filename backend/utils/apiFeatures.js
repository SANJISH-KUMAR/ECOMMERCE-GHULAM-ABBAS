//First of all, we have a class APIFeatures in which we have the search function.
//In search(), we will check if keyword exist then we will simply search in the name field of the
// product.First of all, the keyword is the query that the user will enter in the search box.
//?name="AirPods"
// Remember we are using the regex so that it does not only match exact same keyword.
// And then we simply spread that keyword object in the find() with the spread operator.

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // {keyword : AirPods} because we enter ?keyword=AirPods in search box as querystring
        console.log(this.queryStr);

        // as queryStr is {keyword : AirPods} so this.queryStr.keyword = AirPods
        console.log(this.queryStr.keyword); // -> AirPods

        // if keyword exists in queryStr ie ?keyword=AirPods etc ie keyword = AirPods exists and is not
        // undefined or blank , then name field is searched for matching regex pattern ie AirPods
        // else {}
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            } :
            {};

        //keyword = { name: { '$regex': 'AirPods', '$options': 'i' } }
        console.log(keyword);

        //in the Query Object (Product.find()) find the keyword using spread operator
        this.query = this.query.find({...keyword });
        return this;
    }

    filter() {
        //?keyword=AirPods&category=Laptops
        // this.queryStr = {keyword : AirPods, category:Laptops}
        const queryCopy = {...this.queryStr };

        console.log('Copying Query');
        // {
        //     keyword: AirPods,
        //     (category = Laptops);
        // }
        //{keyword : AirPods, category:Laptops}
        console.log(queryCopy);

        // Removing fields from the query
        // since keyword is not a field in our collections Product we remove it

        //{ keyword: 'apple', price: { gte: '1', lte: '200' } }
        //{ price: { gte: '1', lte: '200' } }

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach((el) => delete queryCopy[el]);

        //{ category: 'Laptops' }
        console.log(queryCopy);

        this.query = this.query.find(queryCopy);

        //in POSTMAN TYPE {{DOMAIN}}/api/v1/products?keyword=apple&price[gte]=1&price[lte]=200
        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        console.log(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;