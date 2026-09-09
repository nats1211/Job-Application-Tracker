import { insertApplications } from "../features/application/db/application";

async function main() {
  try {
    const result = await insertApplications({
      userId: "574be9d0-831f-44f2-a629-35bc79c17e06",
      company: "Test Co",
      role: "Software Engineer",
      status: "wishlist",
    });

    console.log("Inserted", result);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
