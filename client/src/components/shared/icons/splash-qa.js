import StyledSVG from '../StyledSVG';
import React from 'react';
import styled from 'styled-components';

const Icon = styled(StyledSVG)`
    fill: ${props => props.theme.accent};
    height:32px;
    width:32px;
`

const Upvote = () => (
    <Icon height="480pt" viewBox="0 0 480.00107 480" width="480pt" xmlns="http://www.w3.org/2000/svg">
        <path d="m195.089844 188.800781 16.800781 10.070313c3.777344 2.179687 8.605469.929687 10.851563-2.808594 2.246093-3.738281 1.085937-8.589844-2.613282-10.902344l-14.847656-8.917968c7.164062-12.191407 10.867188-26.105469 10.71875-40.242188 0-35.289062-21.527344-64-48-64s-48 28.710938-48 64 21.527344 64 48 64c10.121094-.171875 19.800781-4.171875 27.089844-11.199219zm-59.089844-52.800781c0-26.015625 14.65625-48 32-48s32 21.984375 32 48c.121094 11.230469-2.792969 22.289062-8.429688 32l-11.449218-6.863281c-3.777344-2.179688-8.605469-.929688-10.851563 2.808593-2.25 3.738282-1.085937 8.589844 2.613281 10.902344l8.613282 5.167969c-3.679688 2.535156-8.027344 3.921875-12.496094 3.984375-17.34375 0-32-21.984375-32-48zm0 0" />
        <path d="m319.535156 269.3125c-1.132812-3.1875-4.152344-5.316406-7.535156-5.316406s-6.398438 2.128906-7.535156 5.316406l-40 112c-1.484375 4.160156.6875 8.738281 4.847656 10.222656 4.164062 1.484375 8.738281-.683594 10.222656-4.847656l12.394532-34.6875h40.144531l12.390625 34.6875c1.136718 3.1875 4.152344 5.3125 7.535156 5.3125 2.601562 0 5.042969-1.261719 6.539062-3.390625 1.5-2.125 1.871094-4.847656.996094-7.296875zm-21.894531 66.6875 14.359375-40.214844 14.402344 40.214844zm0 0" />
        <path d="m448.226562 396.289062c20.375-23.363281 31.65625-53.285156 31.773438-84.289062 0-72.597656-63.710938-133.597656-146.664062-142.625 1.761718-8.34375 2.65625-16.847656 2.664062-25.375 0-79.398438-75.359375-144-168-144s-168 64.601562-168 144c.125 28.507812 9.734375 56.160156 27.3125 78.601562l-26.792969 70.558594c-.933593 2.457032-.597656 5.21875.894531 7.382813 1.496094 2.164062 3.957032 3.457031 6.585938 3.457031 1.101562-.003906 2.191406-.230469 3.199219-.671875l75.570312-33.230469c18.875 8.863282 39.125 14.449219 59.878907 16.511719-1.757813 8.347656-2.644532 16.859375-2.648438 25.390625 0 79.402344 75.359375 144 168 144 25.652344.058594 51.054688-5.035156 74.695312-14.984375l81.921876 38.234375c3.007812 1.402344 6.566406.804688 8.949218-1.503906 2.382813-2.308594 3.09375-5.847656 1.785156-8.898438zm-364.480468-142.328124-61.488282 27.03125 21.597657-56.953126c1.015625-2.675781.527343-5.6875-1.285157-7.902343-17-20.210938-26.394531-45.726563-26.570312-72.136719 0-70.574219 68.183594-128 152-128s152 57.425781 152 128c0 10.21875-1.460938 20.386719-4.335938 30.191406-16.464843 57.59375-77.222656 97.808594-147.664062 97.808594-3.605469 0-7.152344-.070312-10.902344-.382812-23.144531-1.199219-45.796875-7.148438-66.542968-17.480469-2.132813-1.070313-4.628907-1.132813-6.808594-.175781zm306.4375 171.03125c-2.113282-.988282-4.550782-1-6.679688-.039063-22.507812 9.996094-46.875 15.125-71.503906 15.046875-83.816406 0-152-57.421875-152-128 .003906-8.097656.917969-16.171875 2.730469-24.0625 1.75.0625 3.503906.0625 5.269531.0625 4.769531 0 9.496094-.171875 14.175781-.511719 1.601563-.113281 3.128907-.34375 4.707031-.496093 3.070313-.296876 6.148438-.566407 9.175782-1 1.863281-.273438 3.679687-.65625 5.519531-.976563 2.679687-.464844 5.375-.894531 8-1.472656 1.957031-.421875 3.863281-.964844 5.789063-1.445313 2.457031-.617187 4.929687-1.199218 7.347656-1.90625 1.964844-.574218 3.878906-1.261718 5.820312-1.902344 2.296875-.761718 4.609375-1.488281 6.859375-2.328124 1.941407-.726563 3.832031-1.550782 5.742188-2.34375 2.152343-.886719 4.320312-1.761719 6.398437-2.71875 1.90625-.882813 3.746094-1.851563 5.601563-2.785157 2.015625-1.007812 4.039062-2.007812 6-3.089843 1.960937-1.078126 3.625-2.117188 5.417969-3.199219 1.789062-1.078125 3.765624-2.246094 5.597656-3.441407 1.832031-1.191406 3.464844-2.398437 5.175781-3.597656 1.714844-1.199218 3.480469-2.472656 5.167969-3.769531s3.265625-2.640625 4.871094-4c1.609374-1.359375 3.203124-2.6875 4.753906-4.085937 1.550781-1.402344 3.039062-2.875 4.527344-4.335938 1.488281-1.464844 2.9375-2.898438 4.335937-4.394531 1.402344-1.496094 2.785156-3.085938 4.136719-4.664063 1.351562-1.574218 2.648437-3.109375 3.910156-4.703125 1.265625-1.589843 2.496094-3.289062 3.707031-4.960937 1.207031-1.671875 2.398438-3.3125 3.472657-5.007813 1.070312-1.695312 2.191406-3.445312 3.199218-5.207031 1.007813-1.757812 2.054688-3.527344 3.015625-5.335938.960938-1.808593 1.855469-3.582031 2.726563-5.40625.871094-1.824218 1.746094-3.761718 2.550781-5.671874.808594-1.914063 1.507813-3.691407 2.203125-5.601563.351562-.960937.796875-1.871094 1.117188-2.839844 76.210937 7.199219 134.976562 62.039063 134.976562 127.199219-.191406 28.800781-11.28125 56.460938-31.039062 77.417969-2.109376 2.316406-2.667969 5.65625-1.433594 8.535156l24.851562 57.925781zm0 0" />
    </Icon>
);

export default Upvote;