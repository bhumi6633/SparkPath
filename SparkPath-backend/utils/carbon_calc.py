def calculate_co2_saved(distance_km, co2_perkm=0.192):
    # taking def co2 emission for a gas vehicle as compared to EV options

    return round(distance_km*co2_perkm, 2)


def convert_to_trees_saved(kg_co2):
    # 1 mature tree ===> absorbs ==> 21.77 kg CO2 per year
    return round(kg_co2/21.77,2)

def apply_pooling_mult(co2_saved, passengers=1):
    # simple logic ==> more pass = more carbon,, 1.5x for 2 pas

    mult = 1 + ((passengers-1)*0.5)
    return round(co2_saved*mult, 2)
