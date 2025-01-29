import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../api";
import { moneyFormatter } from "../utils/MoneyFormatter";
import { dateFormatter } from "../utils/DateFormatter";
import {
  TbBrandFacebook,
  TbBrandReddit,
  TbBrandTwitter,
  TbCalendar,
  TbCalendarClock,
  TbCash,
  TbMail,
  TbMapPin,
  TbPhone,
  TbShare,
  TbSocial,
  TbTags,
  TbUsers,
  TbWorld,
} from "react-icons/tb";
import AddToCalendar from "../components/AddToCalendar";
import Modal from "../components/Modal";
import { useEventPurchase } from "../hooks/useEventPurchase";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";
import TagDisplayHelper from "../components/TagDisplayHelper";

function Landing_EventDetails() {
  const checkError = useErrorChecker();

  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showCalendarLinks, setShowCalendarLinks] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const purchaseEvent = useEventPurchase(event);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runFetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await getEvent(eventId);
        setEvent(response.data);
      } catch (error) {
        checkError(error);
      } finally {
        setIsLoading(false);
      }
    };

    runFetchEvent();
  }, []);

  return (
    <PageLoader isLoading={isLoading} message="fetching event">
      {event && (
        <div className="text-copy-primary min-h-[calc(100vh-5rem)] max-w-screen-xl mx-auto p-4">
          <AddToCalendar eventData={event} isOpen={showCalendarLinks} onClose={() => setShowCalendarLinks(false)} />

          <ShareToSocial
            isOpen={showSocialShare}
            onClose={() => setShowSocialShare(false)}
            url={window.location.href}
            title={event.event_name}
            text={event.event_description}
          />

          <div className="shadow-md rounded-lg">
            <img
              src={event.event_thumbnail}
              alt={`${event.event_name} image`}
              className="rounded-lg w-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400?text=Image+Not+Available";
              }}
            />
          </div>

          <div className="mt-4 bg-card rounded-md p-4 w-full shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{event.event_name}</h2>
            <p className="text-copy-secondary">{event.event_description}</p>
          </div>

          <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="bg-card rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md">
                {/* Event Details */}
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Event Details</h2>
                </div>

                {/* Start Date */}
                {eventDetailsHelper({
                  icon: <TbCalendarClock size={23} />,
                  title: "Start Date",
                  data: dateFormatter(event.event_start_date, 3),
                })}

                {/* End Date */}
                {eventDetailsHelper({
                  icon: <TbCalendarClock size={23} />,
                  title: "End Date",
                  data: dateFormatter(event.event_end_date, 3),
                })}

                {/* Location */}
                {eventDetailsHelper({
                  icon: <TbMapPin size={23} />,
                  title: "Location",
                  data: `${event.event_street_address}, ${event.event_city_town}, ${event.event_postcode}`,
                })}

                {/* Attendees */}
                {eventDetailsHelper({
                  icon: <TbUsers size={23} />,
                  title: "Attendees",
                  data: `${event.event_attendees} / ${event.event_capacity}`,
                })}

                {/* Phone */}
                {eventDetailsHelper({
                  icon: <TbPhone size={23} />,
                  title: "Contact Phone",
                  data: `${event.event_contact_phone_prefix} ${event.event_contact_phone}`,
                })}

                {/* Email */}
                {eventDetailsHelper({
                  icon: <TbMail size={23} />,
                  title: "Contact Email",
                  data: event.event_contact_email,
                })}

                {/* Website */}
                {eventDetailsHelper({
                  icon: <TbWorld size={23} />,
                  title: "Website",
                  data: event.event_website,
                })}

                {/* Created At */}
                {eventDetailsHelper({
                  icon: <TbCalendar size={23} />,
                  title: "Created At",
                  data: dateFormatter(event.event_created_at, 3),
                })}

                {/* Modified At */}
                {eventDetailsHelper({
                  icon: <TbCalendar size={23} />,
                  title: "Modified At",
                  data: dateFormatter(event.event_modified_at, 3),
                })}

                {/* Price */}
                {eventDetailsHelper({
                  icon: <TbCash size={23} />,
                  title: "Cost",
                  data: `£${moneyFormatter(event.event_cost_in_pence)}`,
                })}

                {/* Tags */}
                <div className="flex flex-row space-x-3 items-start col-span-1 md:col-span-2">
                  <div className="rounded-full p-2 bg-background w-fit h-fit">
                    <TbTags size={23} />
                  </div>
                  <div>
                    <p className="font-semibold">Tags</p>
                    <div className="text-copy-secondary flex flex-wrap gap-2">
                      <TagDisplayHelper tags={event.event_tags} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="bg-card rounded-md p-4 flex flex-col justify-center items-center w-full h-full shadow-md">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">£{moneyFormatter(event.event_cost_in_pence)}</h2>
                  <p className="text-copy-secondary">per ticket</p>

                  <div className="flex flex-col justify-center space-y-2">
                    <button
                      className={`p-3 bg-cta hover:bg-cta-active text-cta-text rounded-md font-semibold mt-5 ${
                        event.event_attendees >= event.event_capacity || new Date(event.event_start_date) <= new Date()
                          ? "cursor-not-allowed bg-cta/30 hover:bg-cta/30"
                          : ""
                      }`}
                      onClick={purchaseEvent}
                      disabled={
                        event.event_attendees >= event.event_capacity || new Date(event.event_start_date) <= new Date()
                      }
                    >
                      {event.event_cost_in_pence > 0 ? "Purchase Now" : "Signup Now"}
                    </button>

                    <button
                      onClick={() => setShowCalendarLinks((prev) => !prev)}
                      className="p-3 bg-cta hover:bg-cta-active text-cta-text rounded-md font-semibold flex flex-row items-center"
                    >
                      <TbCalendar className="mr-2" size={17} />
                      <span>Add to calendar</span>
                    </button>

                    <button
                      onClick={() => setShowSocialShare((prev) => !prev)}
                      className="p-3 bg-cta hover:bg-cta-active text-cta-text rounded-md font-semibold flex flex-row items-center"
                    >
                      <TbShare className="mr-2" size={17} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLoader>
  );
}

export default Landing_EventDetails;

function eventDetailsHelper({ icon, title, data }) {
  return (
    <div className="flex flex-row space-x-3 items-center">
      <div className="rounded-full p-2 bg-background w-fit h-fit">{icon}</div>

      <div className="">
        <p className="font-semibold">{title}</p>
        <p className="text-copy-secondary">{data}</p>
      </div>
    </div>
  );
}

function ShareToSocial({ isOpen, onClose, url: shareUrl, title: shareTitle, text: shareText }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle={"Share Event On Social Media"}>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() =>
            window.open(`https://twitter.com/share?url=${shareUrl}&text=${shareText}`, "_blank", "noopener,noreferrer")
          }
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <TbBrandTwitter size={17} />
          <span>Twitter</span>
        </button>
        <button
          onClick={() =>
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "noopener,noreferrer")
          }
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <TbBrandFacebook size={17} />
          <span>Facebook</span>
        </button>
        <button
          onClick={() =>
            window.open(
              `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="bg-cta hover:bg-cta-active text-cta-text p-2 rounded-md flex items-center space-x-2"
        >
          <TbBrandReddit size={17} />
          <span>Reddit</span>
        </button>
      </div>
    </Modal>
  );
}

/*

- Get event id from link
- Fetch event by id
- Display event info
- Add to calendar
- Pay for the event

Optional:
- Share event

*/
