import { Rating } from "@mui/material";

function Review() {
  return (
    <div>
      {/* Header Review */}
      <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
      {/* customer review 1*/}
      <div className="leading-4 mb-3">
        <h3 className="font-semibold text-md">John Wick</h3>
        <div className=" flex flex-row items-center space-x-3">
          <Rating
            name="half-rating"
            defaultValue={4}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-base">4</span>
        </div>
        <p className="text-sm leading-4">
          The product is nice. I got the delivery on time. I am using it for the
          last four months. My experience with this product is very good.
        </p>
      </div>
      {/* customer review 2*/}
      <div className="leading-4 mb-3">
        <h3 className="font-semibold text-md">Barry Allen</h3>
        <div className=" flex flex-row items-center space-x-3">
          <Rating
            name="half-rating"
            defaultValue={4.5}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-base">4.7</span>
        </div>
        <p className="text-sm leading-4">
          “I got a pair of boots from store X and I’m very satisfied. They are
          high-quality and worth the money. The store also offered free shipping
          at that price so that’s a plus!”
        </p>
      </div>
      {/* customer review 3*/}
      <div className="leading-4 mb-3">
        <h3 className="font-semibold text-md">Temetrius Jamel</h3>
        <div className=" flex flex-row items-center space-x-3">
          <Rating
            name="half-rating"
            defaultValue={3.5}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-base">3.8</span>
        </div>
        <p className="text-sm leading-4">
          The quality could have been better. I feel like wasting my money. I
          should have been more careful while buying it.
        </p>
      </div>
      {/* customer review 4*/}
      <div className="leading-4 mb-3">
        <h3 className="font-semibold text-md">Mai Thai</h3>
        <div className=" flex flex-row items-center space-x-3">
          <Rating
            name="half-rating"
            defaultValue={5}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-base">5</span>
        </div>
        <p className="text-sm leading-4">
          I am satisfied with the value for money of the product. Everything
          seems nice but the delivery time seems a bit delayed
        </p>
      </div>
      {/* customer review 5*/}
      <div className="leading-4 mb-3">
        <h3 className="font-semibold text-md">Lisa Blackpink</h3>
        <div className=" flex flex-row items-center space-x-3">
          <Rating
            name="half-rating"
            defaultValue={4}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-base">4</span>
        </div>
        <p className="text-sm leading-4">
          Lisa think this Product is Good but not Great it&apos;s something
          should fix it but now is OK
        </p>
      </div>
    </div>
  );
}

export default Review;
