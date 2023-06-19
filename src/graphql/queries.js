/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSupervisor = /* GraphQL */ `
  query GetSupervisor($id: ID!) {
    getSupervisor(id: $id) {
      id
      name
      date
      place
      problem
      solved
      probimage
      solvedimage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSupervisors = /* GraphQL */ `
  query ListSupervisors(
    $filter: ModelSupervisorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupervisors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        date
        place
        problem
        solved
        probimage
        solvedimage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getManager = /* GraphQL */ `
  query GetManager($id: ID!) {
    getManager(id: $id) {
      id
      name
      date
      place
      problem
      solved
      probimage
      solvedimage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listManagers = /* GraphQL */ `
  query ListManagers(
    $filter: ModelManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        date
        place
        problem
        solved
        probimage
        solvedimage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
