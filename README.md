# RC_BACKEND

{ 
name  : string, notnull
Phone_number: string_max_len10, notnull
 ID: string,
ListedBooks :[uniqueId1,uniqueId2,... ],
Location: {state:haryana, city:bhiwani},
Favourite books:[uniqueId1,uniqueId2,...],
Photo Uri : string
Notifications : [NotificationObject1,NotificationObject2,.....]

}

Books Schema
{
ID: String, notnull
name: string, notnull
authorName: string, 
edition/year of publication: string,
Class recommended: (beginner friendly, medium or advanced),
Subject: string,
conditionOfBook: string,
listedBy- unique user Id,
Location:{state: “X”,city:”Y”}
photosUriArray,
Price: String
Description: string
}
