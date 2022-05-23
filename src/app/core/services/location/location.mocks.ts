
export const locationMocks: Record<string, any> = {};

locationMocks['5efb6d9804ff310008ffd3c4'] = {
    "id": "5efb6d9804ff310008ffd3c4",
    "type": "ROOT",
    "name": "All Locations",
    "description": "Root Location, contains all locations within the account",
    "tags": [],
    "createdAt": "2020-06-30T16:51:36.771Z",
    "createdBy": null,
    "updatedAt": "2020-06-30T16:51:36.771Z",
    "updatedBy": null,
    "fullLocationPath": [],
    "immediateSublocations": [
      {
        "id": "62877fea77919a0009733e0d",
        "name": "UV Angel Hospital",
        "type": "BUILDING",
        "description": null,
        "tags": [],
        "createdAt": "2022-05-20T11:47:54.794Z",
        "updatedAt": "2022-05-20T11:47:54.794Z",
        "__typename": "Location"
      }
    ],
    "__typename": "Location"
  };

locationMocks['62877fea77919a0009733e0d'] = {
    "id":"62877fea77919a0009733e0d",
    "type":"BUILDING",
    "name":"UV Angel Hospital",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:47:54.794Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:47:54.794Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:48:08.115Z",
          "updatedAt":"2022-05-20T11:48:08.115Z",
          "__typename":"Location"
       }
    ],
    "__typename":"Location"
 };

 locationMocks['62877ff877919a0009733e0f'] = {
    "id":"62877ff877919a0009733e0f",
    "type":"FLOOR",
    "name":"Floor 2",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:48:08.115Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:48:08.115Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       {
          "id":"6287802d77919a0009733e11",
          "name":"Room 1",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:49:01.917Z",
          "updatedAt":"2022-05-20T11:49:01.917Z",
          "__typename":"Location"
       },
       {
          "id":"6287803577919a0009733e13",
          "name":"Room 2",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:49:09.980Z",
          "updatedAt":"2022-05-20T11:49:09.980Z",
          "__typename":"Location"
       },
       {
          "id":"6287803e77919a0009733e15",
          "name":"Room 3",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:49:18.195Z",
          "updatedAt":"2022-05-20T11:49:18.195Z",
          "__typename":"Location"
       },
       {
          "id":"6287804677919a0009733e17",
          "name":"Room 4",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:49:26.599Z",
          "updatedAt":"2022-05-20T11:49:26.599Z",
          "__typename":"Location"
       },
       {
          "id":"6287806977919a0009733e19",
          "name":"Conference Room 1",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:50:01.333Z",
          "updatedAt":"2022-05-20T11:50:01.333Z",
          "__typename":"Location"
       },
       {
          "id":"6287807677919a0009733e1b",
          "name":"Conference Room 2",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:50:14.653Z",
          "updatedAt":"2022-05-20T11:50:14.653Z",
          "__typename":"Location"
       },
       {
          "id":"6287809d77919a0009733e1d",
          "name":"Patient Room 1",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:50:53.441Z",
          "updatedAt":"2022-05-20T11:50:53.441Z",
          "__typename":"Location"
       },
       {
          "id":"628780a677919a0009733e1f",
          "name":"Patient Room 2",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:51:02.359Z",
          "updatedAt":"2022-05-20T11:51:02.359Z",
          "__typename":"Location"
       },
       {
          "id":"628780b477919a0009733e21",
          "name":"Patient Room 3",
          "type":"ROOM",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:51:16.273Z",
          "updatedAt":"2022-05-20T11:51:16.273Z",
          "__typename":"Location"
       },
       {
          "id":"628780c577919a0009733e23",
          "name":"Interior Hallway",
          "type":"AREA",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:51:33.913Z",
          "updatedAt":"2022-05-20T11:51:33.913Z",
          "__typename":"Location"
       },
       {
          "id":"628780d577919a0009733e25",
          "name":"Exterior Hallway",
          "type":"AREA",
          "description":null,
          "tags":[
             
          ],
          "createdAt":"2022-05-20T11:51:49.419Z",
          "updatedAt":"2022-05-20T11:51:49.419Z",
          "__typename":"Location"
       }
    ],
    "__typename":"Location"
 };

 locationMocks['6287806977919a0009733e19'] = {
    "id":"6287806977919a0009733e19",
    "type":"ROOM",
    "name":"Conference Room 1",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:50:01.333Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:50:01.333Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

locationMocks['6287807677919a0009733e1b'] = {
    "id":"6287807677919a0009733e1b",
    "type":"ROOM",
    "name":"Conference Room 2",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:50:14.653Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:50:14.653Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['628780d577919a0009733e25'] = {
    "id":"628780d577919a0009733e25",
    "type":"AREA",
    "name":"Exterior Hallway",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:51:49.419Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:51:49.419Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['628780c577919a0009733e23'] = {
    "id":"628780c577919a0009733e23",
    "type":"AREA",
    "name":"Interior Hallway",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:51:33.913Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:51:33.913Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['6287809d77919a0009733e1d'] = {
    "id":"6287809d77919a0009733e1d",
    "type":"ROOM",
    "name":"Patient Room 1",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:50:53.441Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:50:53.441Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['628780a677919a0009733e1f'] = {
    "id":"628780a677919a0009733e1f",
    "type":"ROOM",
    "name":"Patient Room 2",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:51:02.359Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:51:02.359Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['628780b477919a0009733e21'] = {
    "id":"628780b477919a0009733e21",
    "type":"ROOM",
    "name":"Patient Room 3",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:51:16.273Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:51:16.273Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['6287802d77919a0009733e11'] = {
    "id":"6287802d77919a0009733e11",
    "type":"ROOM",
    "name":"Room 1",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:49:01.917Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:49:01.917Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['6287803577919a0009733e13'] = {
    "id":"6287803577919a0009733e13",
    "type":"ROOM",
    "name":"Room 2",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:49:09.980Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:49:09.980Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['6287803e77919a0009733e15'] = {
    "id":"6287803e77919a0009733e15",
    "type":"ROOM",
    "name":"Room 3",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:49:18.195Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:49:18.195Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };

 locationMocks['6287804677919a0009733e17'] = {
    "id":"6287804677919a0009733e17",
    "type":"ROOM",
    "name":"Room 4",
    "description":null,
    "tags":[
       
    ],
    "createdAt":"2022-05-20T11:49:26.599Z",
    "createdBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "updatedAt":"2022-05-20T11:49:26.599Z",
    "updatedBy":{
       "id":"5e4eb02cf014e27a403c7fec",
       "username":"df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
       "email":"devuser01@uvangel.com",
       "firstName":"01_firstName",
       "lastName":"01_lastName",
       "__typename":"User"
    },
    "fullLocationPath":[
       {
          "id":"5efb6d9804ff310008ffd3c4",
          "name":"All Locations",
          "type":"ROOT",
          "description":"Root Location, contains all locations within the account",
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877fea77919a0009733e0d",
                "name":"UV Angel Hospital",
                "type":"BUILDING",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877fea77919a0009733e0d",
          "name":"UV Angel Hospital",
          "type":"BUILDING",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"62877ff877919a0009733e0f",
                "name":"Floor 2",
                "type":"FLOOR",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       },
       {
          "id":"62877ff877919a0009733e0f",
          "name":"Floor 2",
          "type":"FLOOR",
          "description":null,
          "tags":[
             
          ],
          "immediateSublocations":[
             {
                "id":"6287802d77919a0009733e11",
                "name":"Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803577919a0009733e13",
                "name":"Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287803e77919a0009733e15",
                "name":"Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287804677919a0009733e17",
                "name":"Room 4",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287806977919a0009733e19",
                "name":"Conference Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287807677919a0009733e1b",
                "name":"Conference Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"6287809d77919a0009733e1d",
                "name":"Patient Room 1",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780a677919a0009733e1f",
                "name":"Patient Room 2",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780b477919a0009733e21",
                "name":"Patient Room 3",
                "type":"ROOM",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780c577919a0009733e23",
                "name":"Interior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             },
             {
                "id":"628780d577919a0009733e25",
                "name":"Exterior Hallway",
                "type":"AREA",
                "description":null,
                "tags":[
                   
                ],
                "__typename":"Location"
             }
          ],
          "__typename":"Location"
       }
    ],
    "immediateSublocations":[
       
    ],
    "__typename":"Location"
 };