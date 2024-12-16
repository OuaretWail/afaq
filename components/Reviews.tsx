import ReviewsSlider from "./ReviewsSlider"

const Review = () => {
    return (
        <section>
          <h1 className="text-[60px] font-bold bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B] bg-clip-text text-transparent text-center">
          آراء المشاركين و المشاركات
            </h1>
            <div className="py-12 pb-20 mx-4 sm:mx-0">
                <ReviewsSlider />
            </div>

        </section>
    )
}

export default Review;