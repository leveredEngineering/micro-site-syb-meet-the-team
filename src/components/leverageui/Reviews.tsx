import React, { useEffect, useState } from 'react';
import { JsonView, collapseAllNested, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import spinner from "../../assets/images/spinner.gif";
import { YextReviewData } from 'src/types/entities';


type GeneratorResponse = {
  message: string;
  repoUrl?: string;
}

const Reviews = () => {
  // Form Data
  const [firstName, setFirstName] = useState("John");
  const [lastName, setlastName] = useState("Doe");
  const [email, setEmail] = useState("jd@levered.xyz");
  const [reviewContent, setReviewContent] = useState("This is lorem ipsum");
  const [rating, setRating] = useState(5);

  const [response, setResponse] = useState<GeneratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e :any) => {
    e.preventDefault();

    const yextReviewSubmission :YextReviewData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      rating: 5,
      reviewContent: "This is a review body",
    }
    console.log(yextReviewSubmission);
    try {
      setIsLoading(true)
      // Make a POST request to your API endpoint using fetch
      const response = await fetch('https://5iwqikxcbk.execute-api.us-east-1.amazonaws.com/staging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yextReviewSubmission),
      });
      
      // TODO(tredshaw): update error response to be json
      const responseData: GeneratorResponse = await response.json();
      console.log('Response:', responseData);
      setResponse(responseData)
    } catch (error :any) {
      //TODO(tredshaw): handle errors
      const errorResponse :GeneratorResponse = {
        message: "Error displaying request properly, check network tab..",
      }
      setResponse(errorResponse)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className=" p-4 bg-gray-100 shadow-md rounded w-full">

            <label className="block mb-2 text-sm font-semibold text-gray-600">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </label>

            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
              />
            </label>

            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Rating
              <input
                type="number"
                value={rating}
                onChange={(e) => {
                  const newRating = parseInt(e.target.value)
                  if (newRating >= 1 && newRating <= 5) {
                    setRating(newRating)
                  }
                }}
                className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
              />
            </label>

            {/* Text area for review content */}
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Review Content
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
              />
            </label>
              
            <button
              type="submit"
              className="mt-4 p-2 bg-brand-tertiary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        </div>
        <div className="md:w-1/2 md:px-4">
          {isLoading && (
            <div className="flex flex-col w-full items-center justify-center">
              <span>
                Generating Pages Repo...
              </span>
              <img src={spinner} className="md:w-1/2" />
            </div>
          )}
          {!isLoading && response && (
            <div className="">
              <div className="flex flex-col">
                <h6 className="Heading--sub my-4 md:mt-0">
                  Generator Response
                </h6>
                {response.repoUrl && (
                  <a className="Button--green mb-8 text-center rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" href={response.repoUrl} target="_blank">View on Github</a>
                )}
                <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
