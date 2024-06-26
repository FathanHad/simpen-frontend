"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useFetchFeedbackById } from "../../../common/hooks/feedback/useFetchFeedbackById";
import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs";
import Loading from "../../loading";
import { DetailFeedback } from "../../../components/feedbackPage/DetailFeedback";

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const {
    isLoading: feedbackoading,
    error,
    feedback,
    refetch,
  } = useFetchFeedbackById(id);

  useEffect(() => {
    // Refetch data whenever component mounts
    refetch();
  }, [refetch]);

  console.log(feedback);

  if (error || !feedback) {
    return <div>Error fetching user.</div>;
  }

  return (
    <div className="px-[8vw] py-8">
      <Breadcrumbs excludeId={true} />
      {feedbackoading ? <Loading /> : <DetailFeedback data={feedback} />}
    </div>
  );
};

export default FeedbackDetailPage;
