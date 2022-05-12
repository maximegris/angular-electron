
export const locationMocks: Record<string, any> = {};

locationMocks['5e9f179f997ca45e1d88eb2c'] = {
		"id": "5e9f179f997ca45e1d88eb2c",
		"type": "OFFICE",
		"name": "Austin HQ",
		"description": "Luke's Home Office Location",
		"tags": [
			"city"
		],
		"createdAt": "2020-04-21T15:56:15.322Z",
		"createdBy": null,
		"updatedAt": "2020-04-21T15:56:15.323Z",
		"updatedBy": {
			"id": "5e4eb02cf014e27a403c7fec",
			"username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
			"email": "devuser01@uvangel.com",
			"firstName": "01_firstName",
			"lastName": "01_lastName",
			"__typename": "User"
		},
		"fullLocationPath": [
			{
				"id": "5e9f16f6997ca45e1d88eb2b",
				"name": "All Locations",
				"type": "ROOT",
				"description": "Root Location, contains all locations within the account.",
				"tags": [],
				"immediateSublocations": [
					{
						"id": "5e9f179f997ca45e1d88eb2c",
						"name": "Austin HQ",
						"type": "OFFICE",
						"description": "Luke's Home Office Location",
						"tags": [
							"city"
						],
						"__typename": "Location"
					},
					{
						"id": "5e9f1859997ca45e1d88eb2d",
						"name": "Grand Haven HQ",
						"type": "OFFICE",
						"description": "Grand Haven HQ Office Location",
						"tags": [],
						"__typename": "Location"
					},
					{
						"id": "5e9f1889997ca45e1d88eb2e",
						"name": "Grand Rapids HQ",
						"type": "OFFICE",
						"description": "Grand Rapids HQ Office Location",
						"tags": [],
						"__typename": "Location"
					},
					{
						"id": "5f450db5e202360008d77e23",
						"name": "Travel",
						"type": "OFFICE",
						"description": "Devices that travel with employees\n...\n- mostly just Luke",
						"tags": [
							"dynamic",
							"d2",
							"luke"
						],
						"__typename": "Location"
					},
					{
						"id": "62056bc00a0f520009e5004e",
						"name": "New York HQ",
						"type": "OFFICE",
						"description": null,
						"tags": [],
						"__typename": "Location"
					},
					{
						"id": "6239f10c06e9c2000980322d",
						"name": "Mexico Office",
						"type": "OFFICE",
						"description": null,
						"tags": [],
						"__typename": "Location"
					},
					{
						"id": "626a4adcddd89a00091c241f",
						"name": "San José",
						"type": "CITY",
						"description": null,
						"tags": [],
						"__typename": "Location"
					}
				],
				"__typename": "Location"
			}
		],
		"immediateSublocations": [
			{
				"id": "5e9f18d5997ca45e1d88eb2f",
				"name": "Gables Park Plaza",
				"type": "BUILDING",
				"description": "Building for Austin HQ Office",
				"tags": [],
				"createdAt": "2020-04-21T16:01:25.599Z",
				"updatedAt": "2020-04-21T16:01:25.599Z",
				"__typename": "Location"
			},
			{
				"id": "6005aebceac60c000881251d",
				"name": "Newspaper Stand",
				"type": "OFFICE",
				"description": "test2",
				"tags": [],
				"createdAt": "2021-01-18T15:52:28.241Z",
				"updatedAt": "2021-01-18T15:52:28.241Z",
				"__typename": "Location"
			},
			{
				"id": "6005b22efcc7c60008532431",
				"name": "Even longer sublocation name",
				"type": "VERY_LONG_TYPE",
				"description": "test",
				"tags": [],
				"createdAt": "2021-01-18T16:07:10.127Z",
				"updatedAt": "2021-01-18T16:07:10.127Z",
				"__typename": "Location"
			},
			{
				"id": "614557e26df91a0009105950",
				"name": "Tramor at Oak Run",
				"type": "BUILDING",
				"description": null,
				"tags": [],
				"createdAt": "2021-09-18T03:07:14.419Z",
				"updatedAt": "2021-09-18T03:07:14.419Z",
				"__typename": "Location"
			}
		],
		"__typename": "Location"
};

locationMocks['626a4bd6ddd89a00091c2423'] = {
        "id": "626a4bd6ddd89a00091c2423",
        "type": "FLOOR",
        "name": "Top Floor Inside",
        "description": null,
        "tags": [],
        "createdAt": "2022-04-28T08:09:58.625Z",
        "createdBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "updatedAt": "2022-04-28T08:09:58.625Z",
        "updatedBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "fullLocationPath": [
            {
                "id": "5e9f16f6997ca45e1d88eb2b",
                "name": "All Locations",
                "type": "ROOT",
                "description": "Root Location, contains all locations within the account.",
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "5e9f179f997ca45e1d88eb2c",
                        "name": "Austin HQ",
                        "type": "OFFICE",
                        "description": "Luke's Home Office Location",
                        "tags": [
                            "city"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1859997ca45e1d88eb2d",
                        "name": "Grand Haven HQ",
                        "type": "OFFICE",
                        "description": "Grand Haven HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1889997ca45e1d88eb2e",
                        "name": "Grand Rapids HQ",
                        "type": "OFFICE",
                        "description": "Grand Rapids HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5f450db5e202360008d77e23",
                        "name": "Travel",
                        "type": "OFFICE",
                        "description": "Devices that travel with employees\n...\n- mostly just Luke",
                        "tags": [
                            "dynamic",
                            "d2",
                            "luke"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "62056bc00a0f520009e5004e",
                        "name": "New York HQ",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "6239f10c06e9c2000980322d",
                        "name": "Mexico Office",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4adcddd89a00091c241f",
                        "name": "San José",
                        "type": "CITY",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4adcddd89a00091c241f",
                "name": "San José",
                "type": "CITY",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4afeddd89a00091c2420",
                        "name": "Convention Center",
                        "type": "BUILDING",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4afeddd89a00091c2420",
                "name": "Convention Center",
                "type": "BUILDING",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4bb1ddd89a00091c2421",
                        "name": "Underground Garages",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bc4ddd89a00091c2422",
                        "name": "Ground Floor",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bd6ddd89a00091c2423",
                        "name": "Top Floor Inside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4be8ddd89a00091c2424",
                        "name": "Top Floor Outside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            }
        ],
        "immediateSublocations": [
            {
                "id": "626a5b42cfb3430009e8f307",
                "name": "Auditorium",
                "type": "ROOM",
                "description": null,
                "tags": [],
                "createdAt": "2022-04-28T09:15:46.052Z",
                "updatedAt": "2022-04-28T09:15:46.052Z",
                "__typename": "Location"
            },
            {
                "id": "626a5b7bcfb3430009e8f308",
                "name": "Walkway",
                "type": "ROOM/AREA",
                "description": null,
                "tags": [],
                "createdAt": "2022-04-28T09:16:43.570Z",
                "updatedAt": "2022-04-28T09:16:43.570Z",
                "__typename": "Location"
            },
            {
                "id": "626a5bb4cfb3430009e8f309",
                "name": "Stronghold Engineering",
                "type": "OFFICE",
                "description": null,
                "tags": [],
                "createdAt": "2022-04-28T09:17:40.091Z",
                "updatedAt": "2022-04-28T09:17:40.091Z",
                "__typename": "Location"
            },
            {
                "id": "626a5c10cfb3430009e8f30a",
                "name": "Restaurant",
                "type": "ROOM",
                "description": null,
                "tags": [],
                "createdAt": "2022-04-28T09:19:12.738Z",
                "updatedAt": "2022-04-28T09:19:12.738Z",
                "__typename": "Location"
            }
        ],
        "__typename": "Location"
};

locationMocks['626a5b7bcfb3430009e8f308'] = {
        "id": "626a5b7bcfb3430009e8f308",
        "type": "ROOM/AREA",
        "name": "Walkway",
        "description": null,
        "tags": [],
        "createdAt": "2022-04-28T09:16:43.570Z",
        "createdBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "updatedAt": "2022-04-28T09:16:43.570Z",
        "updatedBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "fullLocationPath": [
            {
                "id": "5e9f16f6997ca45e1d88eb2b",
                "name": "All Locations",
                "type": "ROOT",
                "description": "Root Location, contains all locations within the account.",
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "5e9f179f997ca45e1d88eb2c",
                        "name": "Austin HQ",
                        "type": "OFFICE",
                        "description": "Luke's Home Office Location",
                        "tags": [
                            "city"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1859997ca45e1d88eb2d",
                        "name": "Grand Haven HQ",
                        "type": "OFFICE",
                        "description": "Grand Haven HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1889997ca45e1d88eb2e",
                        "name": "Grand Rapids HQ",
                        "type": "OFFICE",
                        "description": "Grand Rapids HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5f450db5e202360008d77e23",
                        "name": "Travel",
                        "type": "OFFICE",
                        "description": "Devices that travel with employees\n...\n- mostly just Luke",
                        "tags": [
                            "dynamic",
                            "d2",
                            "luke"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "62056bc00a0f520009e5004e",
                        "name": "New York HQ",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "6239f10c06e9c2000980322d",
                        "name": "Mexico Office",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4adcddd89a00091c241f",
                        "name": "San José",
                        "type": "CITY",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4adcddd89a00091c241f",
                "name": "San José",
                "type": "CITY",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4afeddd89a00091c2420",
                        "name": "Convention Center",
                        "type": "BUILDING",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4afeddd89a00091c2420",
                "name": "Convention Center",
                "type": "BUILDING",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4bb1ddd89a00091c2421",
                        "name": "Underground Garages",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bc4ddd89a00091c2422",
                        "name": "Ground Floor",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bd6ddd89a00091c2423",
                        "name": "Top Floor Inside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4be8ddd89a00091c2424",
                        "name": "Top Floor Outside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4bd6ddd89a00091c2423",
                "name": "Top Floor Inside",
                "type": "FLOOR",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a5b42cfb3430009e8f307",
                        "name": "Auditorium",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5b7bcfb3430009e8f308",
                        "name": "Walkway",
                        "type": "ROOM/AREA",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5bb4cfb3430009e8f309",
                        "name": "Stronghold Engineering",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5c10cfb3430009e8f30a",
                        "name": "Restaurant",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            }
        ],
        "immediateSublocations": [],
        "__typename": "Location"
};

locationMocks['626a5b42cfb3430009e8f307'] = {
        "id": "626a5b42cfb3430009e8f307",
        "type": "ROOM",
        "name": "Auditorium",
        "description": null,
        "tags": [],
        "createdAt": "2022-04-28T09:15:46.052Z",
        "createdBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "updatedAt": "2022-04-28T09:15:46.052Z",
        "updatedBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "fullLocationPath": [
            {
                "id": "5e9f16f6997ca45e1d88eb2b",
                "name": "All Locations",
                "type": "ROOT",
                "description": "Root Location, contains all locations within the account.",
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "5e9f179f997ca45e1d88eb2c",
                        "name": "Austin HQ",
                        "type": "OFFICE",
                        "description": "Luke's Home Office Location",
                        "tags": [
                            "city"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1859997ca45e1d88eb2d",
                        "name": "Grand Haven HQ",
                        "type": "OFFICE",
                        "description": "Grand Haven HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1889997ca45e1d88eb2e",
                        "name": "Grand Rapids HQ",
                        "type": "OFFICE",
                        "description": "Grand Rapids HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5f450db5e202360008d77e23",
                        "name": "Travel",
                        "type": "OFFICE",
                        "description": "Devices that travel with employees\n...\n- mostly just Luke",
                        "tags": [
                            "dynamic",
                            "d2",
                            "luke"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "62056bc00a0f520009e5004e",
                        "name": "New York HQ",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "6239f10c06e9c2000980322d",
                        "name": "Mexico Office",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4adcddd89a00091c241f",
                        "name": "San José",
                        "type": "CITY",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4adcddd89a00091c241f",
                "name": "San José",
                "type": "CITY",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4afeddd89a00091c2420",
                        "name": "Convention Center",
                        "type": "BUILDING",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4afeddd89a00091c2420",
                "name": "Convention Center",
                "type": "BUILDING",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4bb1ddd89a00091c2421",
                        "name": "Underground Garages",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bc4ddd89a00091c2422",
                        "name": "Ground Floor",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bd6ddd89a00091c2423",
                        "name": "Top Floor Inside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4be8ddd89a00091c2424",
                        "name": "Top Floor Outside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4bd6ddd89a00091c2423",
                "name": "Top Floor Inside",
                "type": "FLOOR",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a5b42cfb3430009e8f307",
                        "name": "Auditorium",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5b7bcfb3430009e8f308",
                        "name": "Walkway",
                        "type": "ROOM/AREA",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5bb4cfb3430009e8f309",
                        "name": "Stronghold Engineering",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5c10cfb3430009e8f30a",
                        "name": "Restaurant",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            }
        ],
        "immediateSublocations": [],
        "__typename": "Location"
};

locationMocks['626a5c10cfb3430009e8f30a'] = {
        "id": "626a5c10cfb3430009e8f30a",
        "type": "ROOM",
        "name": "Restaurant",
        "description": null,
        "tags": [],
        "createdAt": "2022-04-28T09:19:12.738Z",
        "createdBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "updatedAt": "2022-04-28T09:19:12.738Z",
        "updatedBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "fullLocationPath": [
            {
                "id": "5e9f16f6997ca45e1d88eb2b",
                "name": "All Locations",
                "type": "ROOT",
                "description": "Root Location, contains all locations within the account.",
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "5e9f179f997ca45e1d88eb2c",
                        "name": "Austin HQ",
                        "type": "OFFICE",
                        "description": "Luke's Home Office Location",
                        "tags": [
                            "city"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1859997ca45e1d88eb2d",
                        "name": "Grand Haven HQ",
                        "type": "OFFICE",
                        "description": "Grand Haven HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1889997ca45e1d88eb2e",
                        "name": "Grand Rapids HQ",
                        "type": "OFFICE",
                        "description": "Grand Rapids HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5f450db5e202360008d77e23",
                        "name": "Travel",
                        "type": "OFFICE",
                        "description": "Devices that travel with employees\n...\n- mostly just Luke",
                        "tags": [
                            "dynamic",
                            "d2",
                            "luke"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "62056bc00a0f520009e5004e",
                        "name": "New York HQ",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "6239f10c06e9c2000980322d",
                        "name": "Mexico Office",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4adcddd89a00091c241f",
                        "name": "San José",
                        "type": "CITY",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4adcddd89a00091c241f",
                "name": "San José",
                "type": "CITY",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4afeddd89a00091c2420",
                        "name": "Convention Center",
                        "type": "BUILDING",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4afeddd89a00091c2420",
                "name": "Convention Center",
                "type": "BUILDING",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4bb1ddd89a00091c2421",
                        "name": "Underground Garages",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bc4ddd89a00091c2422",
                        "name": "Ground Floor",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bd6ddd89a00091c2423",
                        "name": "Top Floor Inside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4be8ddd89a00091c2424",
                        "name": "Top Floor Outside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4bd6ddd89a00091c2423",
                "name": "Top Floor Inside",
                "type": "FLOOR",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a5b42cfb3430009e8f307",
                        "name": "Auditorium",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5b7bcfb3430009e8f308",
                        "name": "Walkway",
                        "type": "ROOM/AREA",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5bb4cfb3430009e8f309",
                        "name": "Stronghold Engineering",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5c10cfb3430009e8f30a",
                        "name": "Restaurant",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            }
        ],
        "immediateSublocations": [],
        "__typename": "Location"
};

locationMocks['626a5bb4cfb3430009e8f309'] = {
        "id": "626a5bb4cfb3430009e8f309",
        "type": "OFFICE",
        "name": "Stronghold Engineering",
        "description": null,
        "tags": [],
        "createdAt": "2022-04-28T09:17:40.091Z",
        "createdBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "updatedAt": "2022-04-28T09:17:40.091Z",
        "updatedBy": {
            "id": "5e4eb02cf014e27a403c7fec",
            "username": "df7dffd7-00d4-4ae8-bc45-4812bdd27b09",
            "email": "devuser01@uvangel.com",
            "firstName": "01_firstName",
            "lastName": "01_lastName",
            "__typename": "User"
        },
        "fullLocationPath": [
            {
                "id": "5e9f16f6997ca45e1d88eb2b",
                "name": "All Locations",
                "type": "ROOT",
                "description": "Root Location, contains all locations within the account.",
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "5e9f179f997ca45e1d88eb2c",
                        "name": "Austin HQ",
                        "type": "OFFICE",
                        "description": "Luke's Home Office Location",
                        "tags": [
                            "city"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1859997ca45e1d88eb2d",
                        "name": "Grand Haven HQ",
                        "type": "OFFICE",
                        "description": "Grand Haven HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5e9f1889997ca45e1d88eb2e",
                        "name": "Grand Rapids HQ",
                        "type": "OFFICE",
                        "description": "Grand Rapids HQ Office Location",
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "5f450db5e202360008d77e23",
                        "name": "Travel",
                        "type": "OFFICE",
                        "description": "Devices that travel with employees\n...\n- mostly just Luke",
                        "tags": [
                            "dynamic",
                            "d2",
                            "luke"
                        ],
                        "__typename": "Location"
                    },
                    {
                        "id": "62056bc00a0f520009e5004e",
                        "name": "New York HQ",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "6239f10c06e9c2000980322d",
                        "name": "Mexico Office",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4adcddd89a00091c241f",
                        "name": "San José",
                        "type": "CITY",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4adcddd89a00091c241f",
                "name": "San José",
                "type": "CITY",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4afeddd89a00091c2420",
                        "name": "Convention Center",
                        "type": "BUILDING",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4afeddd89a00091c2420",
                "name": "Convention Center",
                "type": "BUILDING",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a4bb1ddd89a00091c2421",
                        "name": "Underground Garages",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bc4ddd89a00091c2422",
                        "name": "Ground Floor",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4bd6ddd89a00091c2423",
                        "name": "Top Floor Inside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a4be8ddd89a00091c2424",
                        "name": "Top Floor Outside",
                        "type": "FLOOR",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            },
            {
                "id": "626a4bd6ddd89a00091c2423",
                "name": "Top Floor Inside",
                "type": "FLOOR",
                "description": null,
                "tags": [],
                "immediateSublocations": [
                    {
                        "id": "626a5b42cfb3430009e8f307",
                        "name": "Auditorium",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5b7bcfb3430009e8f308",
                        "name": "Walkway",
                        "type": "ROOM/AREA",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5bb4cfb3430009e8f309",
                        "name": "Stronghold Engineering",
                        "type": "OFFICE",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    },
                    {
                        "id": "626a5c10cfb3430009e8f30a",
                        "name": "Restaurant",
                        "type": "ROOM",
                        "description": null,
                        "tags": [],
                        "__typename": "Location"
                    }
                ],
                "__typename": "Location"
            }
        ],
        "immediateSublocations": [],
        "__typename": "Location"
};