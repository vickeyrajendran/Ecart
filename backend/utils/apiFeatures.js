
class APIFeatures {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        let keyword=this.queryStr.keyword ? {
            name:{
        //$regex- mangodb la filter panna use aagum
                $regex: this.queryStr.keyword,
                $options:'i'
    //  $options:'i'-case sensitive kaga kudukradhu idhu
            }
        }:{}
        // idhuku ena na keyword kulla andha keyword relate ah iruka nu paaru ilati empty obj return pannu aod slrom

        this.query.find({...keyword}) // indha find kudutha keyword ellam idhula varum
        return this;
}
filter(){
const queryStrCopy={...this.queryStr};
// Before
// console.log(queryStrCopy);

// after removing fields from query
const removingFields=['keyword', 'limit','page'];
removingFields.forEach(field=> delete queryStrCopy[field]);
// console.log(queryStrCopy);

   // then for price filtering price la lt (i.e less than) idha use panna munnadi $ irukanum
   //idhu object file ah so string ah mathrom
let queryStr= JSON.stringify(queryStrCopy);
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match =>`$${match}`);
// console.log(queryStr);
 
   //find method la obj dan kuduka mudiyum mangodb adha dan accept pannum
this.query.find(JSON.parse(queryStr));

return this;
}
paginate(resPerPage){
    const currentPage= Number(this.queryStr.page) || 1;
    const skip=resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip);
    return this;
}


   }

module.exports=APIFeatures;