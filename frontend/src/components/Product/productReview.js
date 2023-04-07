export default function ProductReview({reviews}){
    return(
        <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review=>(
                <div key={review._id} class="review-card my-3">
                <div class="rating-outer">
                    <div class="rating-inner" style={{width:`${review.rating/5*100}%`}}></div>
                    {/* review.rating/5*100 - this to show ratings in the comment field */}
                </div>
                <p class="review_user">by {review.user.name}</p>
                <p class="review_comment">{review.comment}</p>

                <hr />
                </div>
            ))
            }    
        </div>
    )
}
