import { gql } from "@apollo/client"
import { graphqlClient } from "@utils/gqlClient"
import { Course } from "customs/types"

export const COURSE_QUERY = `
    sys {
        id
    }
    imagesCollection(limit: 1) {
        items {
            url
        }
    }	
    categories
    title
    description {
        json
    }
    price
    requirements {
        json
    }
    teacher {
        sys {
            id
        }
        name
        image {
            url
        }
    }
`
export const COURSE_LESSON_QUERY = `
    lessonsCollection {
      items {
        name
        description {
          json
        }
        startDate
        endDate
      }
    }
`

export const COURSE_LISTS_QUERY = gql`
    {
        courseCollection{
            items{
            ${COURSE_QUERY}   
            }
        }
    }
`

export const COURSE_QUERY_BY_ID = (id: string) => gql`
    {
        course (id:"${id}") {
            ${COURSE_QUERY}
            ${COURSE_LESSON_QUERY}
        }
    }
`

export const getCourseListsQuery = async (): Promise<Course[]> => {
    const { data } = await graphqlClient.query({
        query: COURSE_LISTS_QUERY
    })
    const courses = data.courseCollection.items
    return courses
}

export const getCourseByIdQuery = async (id: string): Promise<Course> => {
    const { data } = await graphqlClient.query({
        query: COURSE_QUERY_BY_ID(id)
    })
    const { course } = data
    return course
}
