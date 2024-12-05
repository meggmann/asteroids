import { z } from 'zod';

const AsteroidSchema = z.object({
  links: z.object({
    self: z.string().url(),
  }),
  id: z.string(),
  neo_reference_id: z.string(),
  name: z.string(),
  nasa_jpl_url: z.string().url(),
  absolute_magnitude_h: z.number(),
  estimated_diameter: z.object({
    kilometers: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
    meters: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
    miles: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
    feet: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
  }),
  is_potentially_hazardous_asteroid: z.boolean(),
  close_approach_data: z.array(
    z.object({
      close_approach_date: z.string(),
      close_approach_date_full: z.string(),
      epoch_date_close_approach: z.number(),
      relative_velocity: z.object({
        kilometers_per_second: z.string(),
        kilometers_per_hour: z.string(),
        miles_per_hour: z.string(),
      }),
      miss_distance: z.object({
        astronomical: z.string(),
        lunar: z.string(),
        kilometers: z.string(),
        miles: z.string(),
      }),
      orbiting_body: z.string(),
    })
  ),
  is_sentry_object: z.boolean(),
});

export type IAsteroid = z.infer<typeof AsteroidSchema>;
export { AsteroidSchema };