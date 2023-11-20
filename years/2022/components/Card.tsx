import { useState } from 'react';
import Image from 'next/future/image';
import ReactMarkdown from 'react-markdown';

import { Speaker } from '../data/speakers';
import { FaMicrophone } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { CgArrowsExpandRight } from 'react-icons/cg';

import SocialLinks from './SocialLinks';

const Card = ({ speaker }: { speaker: Speaker }) => {
  const [isExpanded, setisExpanded] = useState(false);

  const handleCardExpand = () => {
    if (isExpanded) {
      document.body.style.overflow = 'unset';
      setisExpanded(false);
    } else {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
      setisExpanded(true);
    }
  };

  let animate = '';

  let lineClamp = 'line-clamp-4';

  let modalStyle = ' ' + 'relative md:max-w-sm rounded-lg mx-5';

  let buttonIcon = <CgArrowsExpandRight className="text-xl" />;

  let backgroundOverlay = null;

  if (isExpanded) {
    animate = 'animate-appear';

    lineClamp = '';

    modalStyle =
      ' ' + 'fixed top-0 left-0 z-20 h-full md:w-1/2 overflow-y-auto';

    buttonIcon = <MdClose className="text-2xl" />;

    backgroundOverlay = (
      <div
        className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-90"
        onClick={handleCardExpand}
      ></div>
    );
  }

  return (
    <>
      <article
        className={`bg-gray-800 p-5 shadow-lg md:mx-0 ${animate} ${modalStyle}`}
      >
        <button
          onClick={handleCardExpand}
          className="absolute right-3 top-3 cursor-pointer text-gray-400"
        >
          {buttonIcon}
        </button>

        <div className="flex gap-5">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden lg:h-32 lg:w-32">
            <Image
              fill
              src={speaker.profile}
              alt="speaker profile image"
              className="rounded-full object-cover"
              sizes="8rem"
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <h3 className="text-2xl font-bold text-gray-100 lg:text-2xl">
              {speaker.lectureTitle}
            </h3>
            <h3 className="text-lg text-gray-300 lg:text-xl">
              <FaMicrophone className="mr-2 inline-block text-gray-400" />
              {speaker.name}
            </h3>
            <SocialLinks
              github={speaker.github}
              twitter={speaker.twitter}
              twitch={speaker.twitch}
              website={speaker.website}
              linkedin={speaker.linkedin}
              youtube={speaker.youtube}
              amazon={speaker.amazon}
              matrix={speaker.matrix}
              mastodon={speaker.mastodon}
            />
          </div>
        </div>
        <div
          className={`prose prose-invert mt-5 max-w-none px-3 text-left text-gray-400 lg:prose-lg ${lineClamp}`}
        >
          <ReactMarkdown>{speaker.about}</ReactMarkdown>
        </div>
      </article>
      {isExpanded && backgroundOverlay}
    </>
  );
};

export default Card;
