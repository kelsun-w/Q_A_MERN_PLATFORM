import StyledSVG from '../StyledSVG';
import React from 'react';
import styled from 'styled-components';

const Icon = styled(StyledSVG)`
    fill: ${props => props.theme.accent};
    width: 26px;
    height: 26px;
`

const Upvote = () => (
    <Icon height="479pt" viewBox="0 -31 479.54789 479" width="479pt" xmlns="http://www.w3.org/2000/svg">
        <path d="m479.546875 160.273438c-.023437-19-13.386719-35.371094-32-39.199219v-112.800781c0-4.417969-3.582031-8-8-8h-19.199219c-4.167968 0-8.328125.3125-12.488281.703124-.101563 0-.191406-.0625-.296875-.0625-.101562 0-.34375.097657-.527344.105469-15.566406 1.519531-30.757812 5.695313-44.910156 12.351563l-85.351562 40.421875c-25.710938 12.128906-53.777344 18.4375-82.203126 18.480469h-107.023437c-46.867187.242187-85.324219 37.175781-87.4570312 83.996093-2.1328128 46.820313 32.8046872 87.09375 79.4570312 91.597657v144.40625c0 13.253906 10.746094 24 24 24h46.402344c6.757812 0 13.203125-2.851563 17.75-7.855469 4.550781-5 6.777343-11.6875 6.136719-18.417969l-7.398438-77.726562h17.109375c4.417969 0 8-3.582032 8-8v-56h4.800781c27.238282.039062 54.132813 6.085937 78.769532 17.710937l86.976562 41.203125c14.152344 6.648438 29.34375 10.824219 44.910156 12.34375.175782 0 .335938.101562.519532.101562.183593 0 .191406-.054687.296874-.0625 4.160157.390626 8.320313.703126 12.488282.703126h19.238281c4.417969 0 8-3.582032 8-8v-112.800782c18.613281-3.828125 31.976563-20.199218 32-39.199218zm-464 0c.046875-39.746094 32.253906-71.957032 72-72h88v144h-88c-39.746094-.042969-71.953125-32.253907-72-72zm140.289063 237.390624c-1.5 1.671876-3.644532 2.617188-5.886719 2.609376h-46.402344c-4.417969 0-8-3.582032-8-8v-144h48.722656l.132813 1.390624 5.257812 55.371094v.054688l8.222656 86.398437c.230469 2.257813-.515624 4.503907-2.046874 6.175781zm19.710937-101.390624h-10.632813l-4.566406-48h15.199219zm106.449219-44.742188c-26.785156-12.644531-56.03125-19.21875-85.648438-19.257812h-4.800781v-144h3.023437c30.792969-.035157 61.199219-6.863282 89.050782-20l85.335937-40.421876c9.726563-4.535156 20.011719-7.753906 30.589844-9.570312v284c-10.570313-1.804688-20.859375-5.011719-30.582031-9.535156zm149.550781 52.742188h-11.199219c-1.601562 0-3.199218-.199219-4.800781-.273438v-287.453125c1.601563-.074219 3.199219-.273437 4.800781-.273437h11.199219zm16-121.367188v-45.265625c9.597656 3.386719 16.015625 12.457031 16.015625 22.632813 0 10.175781-6.417969 19.246093-16.015625 22.632812zm0 0" />
    </Icon>
);

export default Upvote;