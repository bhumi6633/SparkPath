def calculate_co2_saved(distance_km):
    # Average car emits 0.192 kg CO2 per km
    return round(distance_km * 0.192, 2)

def apply_pooling_mult(co2_emission, passengers):
    # Split emissions among passengers
    if passengers <= 0:
        passengers = 1
    return round(co2_emission / passengers, 2)

def convert_to_trees_saved(co2_kg):
    # Approx: 1 mature tree absorbs ~21.77 kg CO₂/year
    return round(co2_kg / 21.77, 2)
