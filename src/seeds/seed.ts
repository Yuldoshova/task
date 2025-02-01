import { Country } from "../modules/address/entities/country.entity";
import AppDataSource from "../utils/data-source";
import { City } from "../modules/address/entities/city.entity";
import { Color } from "../modules/weather/entities/color.entity";
import { Temperature } from "../modules/weather/entities/temperature.entity";

const seedDatabase = async () => {
    try {
        console.log("Initializing database connection...");
        await AppDataSource.initialize();
        console.log("Database connection successful");
        const countryRepository = AppDataSource.getRepository(Country);
        const cityRepository = AppDataSource.getRepository(City);
        const colorRepository = AppDataSource.getRepository(Color)
        const temperatureRepository = AppDataSource.getRepository(Temperature);

        await temperatureRepository.clear();  // Temperature jadvalidagi barcha ma'lumotlarni o'chirish
        await colorRepository.clear(); 

        await AppDataSource.query('TRUNCATE TABLE "temperatures", "colors" CASCADE')

        // const uzbekistan = await countryRepository.save({ name: "Uzbekistan" });
        // const usa = await countryRepository.save({ name: "United States" });


        // await cityRepository.save([
        //     { name: "Tashkent", country: uzbekistan },
        //     { name: "Samarkand", country: uzbekistan },
        //     { name: "New York", country: usa },
        //     { name: "Los Angeles", country: usa },
        // ]);


        // Temperature Colors
        await colorRepository.save([
            { name: "Deep Blue", hexCode: "#003366" },
            { name: "Ice Blue", hexCode: "#4A90E2" },
            { name: "Light Blue", hexCode: "#B3DFFD" },
            { name: "Pale Grayish Blue", hexCode: "#E6F7FF" },
            { name: "Light Green", hexCode: "#D1F2D3" },
            { name: "Soft Yellow", hexCode: "#FFFACD" },
            { name: "Light Orange", hexCode: "#FFCC80" },
            { name: "Deep Orange", hexCode: "#FF7043" },
            { name: "Bright Red", hexCode: "#D32F2F" },
        ]);

        // Wind Speed Colors
        await colorRepository.save([
            { name: "Light Cyan", hexCode: "#E0F7FA" },
            { name: "Pale Blue", hexCode: "#B2EBF2" },
            { name: "Soft Teal", hexCode: "#4DD0E1" },
            { name: "Bright Blue", hexCode: "#0288D1" },
            { name: "Deep Navy Blue", hexCode: "#01579B" },
        ]);

        // Cloud Coverage Colors
        await colorRepository.save([
            { name: "Light Yellow", hexCode: "#FFF9C4" },
            { name: "Soft Yellow", hexCode: "#FFF176" },
            { name: "Light Gray", hexCode: "#E0E0E0" },
            { name: "Gray", hexCode: "#9E9E9E" },
            { name: "Dark Gray", hexCode: "#616161" },
        ]);

        const colors = await colorRepository.find();

        if (colors.length === 0) {
            console.error("No colors found. Please ensure that colors are seeded first.");
            return;
        }

        // Temperature turini qo'shish
        await temperatureRepository.save([
            { 
                type: "Extreme Cold", 
                min_temp: -30, 
                max_temp: -20, 
                color: colors.find(color => color.name === "Deep Blue") 
            },
            { 
                type: "Very Cold", 
                min_temp: -20, 
                max_temp: -10, 
                color: colors.find(color => color.name === "Ice Blue") 
            },
            { 
                type: "Cold", 
                min_temp: -10, 
                max_temp: 0, 
                color: colors.find(color => color.name === "Light Blue") 
            },
            { 
                type: "Freezing Point", 
                min_temp: 0, 
                max_temp: 10, 
                color: colors.find(color => color.name === "Pale Grayish Blue") 
            },
            { 
                type: "Cool", 
                min_temp: 10, 
                max_temp: 20, 
                color: colors.find(color => color.name === "Light Green") 
            },
            { 
                type: "Mild", 
                min_temp: 20, 
                max_temp: 30, 
                color: colors.find(color => color.name === "Soft Yellow") 
            },
            { 
                type: "Warm", 
                min_temp: 30, 
                max_temp: 40, 
                color: colors.find(color => color.name === "Light Orange") 
            },
            { 
                type: "Hot", 
                min_temp: 40, 
                max_temp: 50, 
                color: colors.find(color => color.name === "Deep Orange") 
            },
            { 
                type: "Extreme Heat", 
                min_temp: 50, 
                max_temp: 60, 
                color: colors.find(color => color.name === "Bright Red") 
            },
        ]);

    } catch (error) {
        console.error("❌ Xatolik yuz berdi:", error);
    } finally {
        await AppDataSource.destroy();
    }
};

seedDatabase();
