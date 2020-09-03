import StyledSVG from '../StyledSVG';
import React from 'react';
import styled from 'styled-components';

const Icon = styled(StyledSVG)`
    fill: ${props => props.theme.accent};
    width: 30px;
    height: 30px;
`

const Upvote = () => (
    <Icon height="478pt" viewBox="-59 0 478 478.59356" width="478pt" xmlns="http://www.w3.org/2000/svg"><path d="m243.386719 359.335938c-12.6875 0-25.601563-10.101563-38.183594-19.925782-9.386719-7.335937-20-15.648437-26.472656-15.710937h-.082031c-6.992188 0-18.117188 8.316406-27.941407 15.660156-15.289062 11.433594-31.097656 23.28125-45.738281 17.042969-14.636719-6.242188-17.125-25.800782-19.519531-44.738282-1.550781-12.214843-3.304688-26.054687-8.207031-31.039062-4.519532-4.601562-17.886719-6.472656-29.6875-8.128906-19.359376-2.71875-39.375-5.527344-45.601563-20.910156-6.222656-15.382813 6.234375-31.304688 18.273437-46.703126 7.335938-9.386718 15.648438-20 15.710938-26.472656.054688-6.984375-8.296875-18.160156-15.664062-28-11.429688-15.289062-23.253907-31.105468-17.039063-45.738281 6.214844-14.628906 25.800781-17.125 44.734375-19.519531 12.21875-1.550782 26.058594-3.304688 31.042969-8.207032 4.597656-4.519531 6.46875-17.886718 8.125-29.6875 2.722656-19.359374 5.53125-39.375 20.914062-45.601562 15.382813-6.222656 31.304688 6.234375 46.703125 18.273438 9.382813 7.335937 20 15.648437 26.472656 15.710937h.078126c6.992187 0 18.121093-8.320313 27.945312-15.664063 15.289062-11.429687 31.105469-23.253906 45.734375-17.039062 14.632813 6.214844 17.128906 25.800781 19.523437 44.734375 1.550782 12.21875 3.300782 26.058594 8.207032 31.042969 4.519531 4.597656 17.886718 6.46875 29.6875 8.125 19.359375 2.722656 39.375 5.53125 45.601562 20.914062 6.222656 15.382813-6.234375 31.304688-18.273437 46.703125-7.335938 9.382813-15.648438 20-15.710938 26.472657-.058593 6.984374 8.292969 18.160156 15.664063 28 11.429687 15.289062 23.253906 31.105468 17.039062 45.734374-6.214844 14.632813-25.800781 17.128907-44.738281 19.519532-12.214844 1.554687-26.054687 3.304687-31.039063 8.210937-4.597656 4.519531-6.472656 17.886719-8.128906 29.6875-2.71875 19.359375-5.527344 39.375-20.910156 45.597657-2.707031 1.101562-5.597656 1.664062-8.519531 1.65625zm-64.71875-51.671876h.214843c11.871094.113282 23.671876 9.335938 36.167969 19.105469 10.71875 8.375 24 18.808594 30.863281 16.046875 6.863282-2.757812 9.167969-19.511718 11.054688-32.984375 2.203125-15.703125 4.289062-30.535156 12.753906-38.863281 8.800782-8.6875 24.800782-10.710938 40.253906-12.671875 13.097657-1.65625 29.394532-3.71875 32-9.894531 2.609376-6.175782-7.199218-19.335938-15.125-29.914063-9.265624-12.421875-18.945312-25.328125-18.867187-37.71875.113281-11.871093 9.335937-23.671875 19.105469-36.167969 8.375-10.71875 18.800781-24.054687 16.046875-30.863281-2.75-6.808593-19.511719-9.167969-32.984375-11.058593-15.703125-2.199219-30.535156-4.285157-38.863282-12.75-8.6875-8.800782-10.710937-24.800782-12.671874-40.257813-1.65625-13.09375-3.71875-29.390625-9.894532-32-6.175781-2.605469-19.335937 7.203125-29.914062 15.128906-12.359375 9.265625-25.175782 18.863281-37.503906 18.863281h-.214844c-11.871094-.109374-23.671875-9.335937-36.167969-19.101562-10.71875-8.378906-24.046875-18.816406-30.863281-16.050781-6.816406 2.769531-9.167969 19.511719-11.054688 32.984375-2.203125 15.707031-4.289062 30.539062-12.753906 38.863281-8.800781 8.691406-24.800781 10.714844-40.257812 12.675781-13.09375 1.652344-29.390626 3.71875-32 9.894532-2.605469 6.175781 7.203124 19.335937 15.128906 29.910156 9.320312 12.464844 18.960937 25.363281 18.847656 37.753906-.109375 11.871094-9.335938 23.671875-19.101562 36.167969-8.378907 10.71875-18.800782 24.054687-16.050782 30.863281 2.753906 6.808594 19.515625 9.167969 32.984375 11.054688 15.707031 2.203124 30.539063 4.289062 38.867188 12.753906 8.6875 8.800781 10.710937 24.800781 12.671875 40.253906 1.652344 13.097656 3.71875 29.394531 9.894531 32 6.175781 2.609375 19.335937-7.199219 29.910156-15.125 12.378907-9.296875 25.195313-18.898438 37.523438-18.898438zm0 0" /><path d="m179.984375 291.664062c-50.179687-.019531-94.21875-33.433593-107.753906-81.757812-13.53125-48.324219 6.742187-99.75 49.613281-125.832031 42.871094-26.085938 97.863281-20.453125 134.558594 13.777343 36.695312 34.230469 46.128906 88.699219 23.078125 133.277344-2.097657 3.792969-6.832031 5.222656-10.679688 3.230469-3.847656-1.996094-5.40625-6.691406-3.519531-10.589844 7.082031-13.621093 10.753906-28.753906 10.703125-44.105469-.019531-43.621093-29.464844-81.738281-71.667969-92.777343-42.203125-11.039063-86.542968 7.777343-107.921875 45.800781-21.378906 38.027344-14.417969 85.6875 16.945313 116.007812 31.359375 30.324219 79.226562 35.675782 116.511718 13.027344 2.441407-1.546875 5.527344-1.652344 8.070313-.28125 2.546875 1.371094 4.152344 4.011719 4.203125 6.898438.050781 2.890625-1.460938 5.585937-3.953125 7.046875-17.535156 10.660156-37.664063 16.292969-58.1875 16.277343zm0 0" /><path d="m251.984375 262.722656c-3.261719 0-6.199219-1.984375-7.417969-5.011718-1.222656-3.03125-.476562-6.496094 1.875-8.757813 2.636719-2.527344 5.128906-5.195313 7.464844-8 2.824219-3.398437 7.867188-3.867187 11.269531-1.042969 3.398438 2.824219 3.867188 7.867188 1.042969 11.265625-2.722656 3.257813-5.628906 6.359375-8.695312 9.289063-1.484376 1.441406-3.46875 2.25-5.539063 2.257812zm0 0" /><path d="m210.386719 237.609375c-3.386719-.015625-6.679688-1.105469-9.410157-3.113281l-20.992187-15.277344-21.023437 15.277344c-5.605469 4.085937-13.207032 4.089844-18.820313.011718-5.609375-4.074218-7.957031-11.304687-5.808594-17.898437l8-24.71875-21.027343-15.28125c-5.613282-4.078125-7.957032-11.308594-5.804688-17.90625 2.152344-6.59375 8.308594-11.054687 15.246094-11.039063h25.992187l8-24.71875c2.15625-6.566406 8.289063-11.003906 15.199219-11.003906 6.914062 0 13.042969 4.4375 15.199219 11.003906l8 24.71875h25.992187c6.933594 0 13.078125 4.460938 15.21875 11.054688 2.144532 6.59375-.203125 13.816406-5.808594 17.890625l-20.953124 15.28125 8.039062 24.71875c2.21875 6.59375-.144531 13.859375-5.816406 17.886719-2.730469 2.011718-6.03125 3.101562-9.421875 3.113281zm-79.640625-73.945313 21.03125 15.28125c5.605468 4.078126 7.945312 11.296876 5.800781 17.886719l-8 24.722657 21.023437-15.28125c5.605469-4.09375 13.210938-4.09375 18.816407 0l20.96875 15.28125-8-24.722657c-2.144531-6.589843.203125-13.8125 5.808593-17.886719l21.03125-15.28125h-25.992187c-6.945313.015626-13.101563-4.453124-15.25-11.054687l-8-24.71875v-.097656l-8 24.800781c-2.136719 6.609375-8.300781 11.082031-15.246094 11.070312zm0 0" /><path d="m270.003906 478.59375c-2.765625.015625-5.34375-1.390625-6.816406-3.726562l-64-102.859376 13.597656-8.453124 54.320313 87.230468 11.570312-42.558594c1.054688-3.78125 4.679688-6.25 8.582031-5.855468l47.902344 5.183594-55.316406-88.898438 13.597656-8.453125 64 102.847656c1.621094 2.597657 1.613282 5.894531-.015625 8.484375-1.628906 2.59375-4.59375 4.03125-7.640625 3.699219l-57.453125-6.226563-14.59375 53.679688c-.835937 3.074219-3.410156 5.355469-6.558593 5.816406-.390626.0625-.785157.09375-1.175782.089844zm0 0" /><path d="m89.96875 478.59375c-.390625.003906-.78125-.027344-1.167969-.089844-3.148437-.460937-5.722656-2.742187-6.558593-5.816406l-14.59375-53.679688-57.453126 6.226563c-3.046874.332031-6.011718-1.105469-7.640624-3.699219-1.628907-2.589844-1.636719-5.886718-.015626-8.484375l64-102.847656 13.597657 8.453125-55.351563 88.898438 47.90625-5.183594c3.902344-.398438 7.527344 2.074218 8.582032 5.855468l11.570312 42.558594 54.34375-87.273437 13.597656 8.457031-64 102.898438c-1.476562 2.335937-4.050781 3.742187-6.816406 3.726562zm0 0" />
    </Icon>
);

export default Upvote;