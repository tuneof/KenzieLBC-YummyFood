import BaseClass from "../util/baseClass";
import DataStore from "../util/DataStore";
import RestaurantClient from "../api/restaurantClient";

/**
 * Logic needed for the view playlist page of the website.
 */
class ReviewPage extends BaseClass {

    constructor() {
        super();
        this.bindClassMethods(['onGetReviews', 'onCreate', 'onUpdate', 'onDelete', 'renderReview'], this);
        this.dataStore = new DataStore();
    }

    /**
     * Once the page has loaded, set up the event handlers and fetch the concert list.
     */
    async mount() {
        document.getElementById('get-reviews').addEventListener('submit', this.onGet);
        document.getElementById('create-review').addEventListener('submit', this.onGet);
        document.getElementById('update-review').addEventListener('submit', this.onGet);
        document.getElementById('delete-review').addEventListener('submit', this.onGet);

        this.client = new reviewClient();

        this.dataStore.addChangeListener(this.renderRestaurant)
        this.onGetReviews();
    }

    // Render Methods --------------------------------------------------------------------------------------------------

    async renderReview() {
        let resultArea = document.getElementById("result-info");

        const reviews = this.dataStore.get("reviews");

        if (reviews) {
            let reviewHTML = "<ul>";
            for (let review of reviews) {
                reviewHTML += `<li>
                <h3>${review.restaurantId}</h3>
                <h4>${review.userId}</h4>
                <h4>${review.rating}</h4>
                <h4>${review.comment}</h4>
                </li>`;
            }
            resultArea.innerHTML = reviewHTML + "</ul>";
        } else {
            resultArea.innerHTML = "No Reviews";
        }
    }

    // Event Handlers --------------------------------------------------------------------------------------------------

        async onGetReviews() {
            let result = await this.client.getAllReviews(this.errorHandler);
            this.dataStore.set("reviews", result);
        }

        async onCreate(event) {
            // Prevent the page from refreshing on form submit
            event.preventDefault();

            let restaurantId = document.getElementById("create-restaurantId-field").value;
            let userId = document.getElementById("create-userId-field").value;
            let rating = document.getElementById("create-rating-field").value;
            let review = document.getElementById("create-review-field").value;

            const createdReview = await this.client.createExample(restaurantId, userId, rating, review ,this.errorHandler);
            this.dataStore.set("reviews", createdReview);

            if (createdReview) {
                this.showMessage("Created a review!")
            } else {
                this.errorHandler("Review was not created. Try Again.");
            }
            this.onGetReviews;
        }

        async onUpdate(event) {
            event.preventDefault();

            let restaurantId = document.getElementById("create-restaurantId-field").value;
            let userId = document.getElementById("create-userId-field").value;
            let rating = document.getElementById("create-rating-field").value;
            let review = document.getElementById("create-review-field").value;

            const createdReview = await this.client.createExample(restaurantId, userId, rating, review ,this.errorHandler);
            this.dataStore.set("reviews", createdReview);

            if (createdReview) {
                this.showMessage("Review Updated!")
            } else {
                this.errorHandler("Review was not updated. Try Again.");
            }
            // Re-displays all Reviews
            this.onGetReviews;
        }

        async onDelete(event) {
            event.preventDefault();

            let restaurantId = document.getElementById("create-restaurantId-field").value;
            let userId = document.getElementById("create-userId-field").value;

            const reviewToDelete = await this.client.createExample(restaurantId, userId, this.errorHandler);
            this.dataStore.set("reviews", reviewToDelete);

            if (createdReview) {
                this.showMessage("The Review has been deleted"!")
            } else {
                this.errorHandler("Could not find Review. Try Again.");
            }
            // Re-displays all Reviews
            this.onGetReviews;
        }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const reviewPage = new ReviewPage();
    reviewPage.mount();
};

window.addEventListener('DOMContentLoaded', main);