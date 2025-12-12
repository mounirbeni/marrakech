# Services Standardization Task

## Master Template: "Royal Moroccan Hammam & Spa Ritual" (id: "h-02")

### Fields to Standardize:
- id, title, subtitle, price, rating, reviews, category, image, duration
- features (array), location, tags (array), images (array)
- host (object with name, image, bio, verified)
- description, included (array), exclusions (array)
- meetingPoint, endingPoint, cancellationPolicy
- requirements (array), ageRestrictions, whatToBring (array)
- experienceHighlights (array), additionalInfo, itinerary (array)
- packageCategories (array with nested packages), minGroupSize, maxGroupSize
- targetAudience, uniqueSellingPoints (array), importantNotes (array)
- whatToExpect, authenticMoroccanElements (array), difficulty
- languages (array), accessibility, seasonalNotes

### Services to Update:
#### Health Services (3 services):
- [ ] h-01: "Rooftop Sunrise Yoga & Meditation" (has basic structure, needs expansion)
- [ ] h-02: "Royal Moroccan Hammam & Spa Ritual" (MASTER TEMPLATE - already complete)
- [ ] h-03: "Rooftop Sunrise Yoga & Wellness" (duplicate of h-01, needs consolidation)

#### City Roaming (4 services):
- [ ] cr-01: "Hidden Gems of the Medina: Walking Tour"
- [ ] cr-02: "Vintage Sidecar Adventure"
- [ ] cr-03: "Ultimate Street Food Tasting Trail"
- [ ] cr-04: "Yves Saint Laurent & Majorelle Garden VIP"

#### City Trips (7 services):
- [ ] ct-01: "Agafay Desert: Sunset, Camel & Dinner Show"
- [ ] ct-02: "Atlas Mountains & Ourika Valley Day Trip"
- [ ] ct-03: "Essaouira Coastal Escape"
- [ ] ct-04: "Ouzoud Waterfalls: Nature Hike & Boat Ride"
- [ ] ct-05: "Quad Biking Adrenaline Rush"
- [ ] ct-06: "Hot Air Balloon: Sunrise Over Atlas"
- [ ] ct-07: "3-Day Desert Expedition: Merzouga Dunes"

#### Workshops (2 services):
- [ ] ot-01: "Master the Tagine: Cooking Class"
- [ ] ot-02: "Perfume Making Workshop"

### Implementation Steps:
1. [ ] Extract complete master template structure
2. [ ] Start with health services (simpler to standardize)
3. [ ] Move to city roaming services
4. [ ] Continue with city trips
5. [ ] Finish with workshops
6. [ ] Verify all services have consistent structure and unique content
7. [ ] Test data integrity and TypeScript compilation

### Quality Checks:
- [ ] All services have same field order as master template
- [ ] Content is unique (no copying from hammam service)
- [ ] Writing style and detail level consistent
- [ ] All arrays and objects properly formatted
- [ ] No missing required fields
