improt

export const fetchAnswers = async (questionId: string) => {
      try {
        // 1. Reference the specific DOCUMENT (user1 -> questionId)
        const docRef = doc(db, "user1", questionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // 2. Convert the object fields into a sorted array
          const sortedAnswers = Object.keys(data)
            .sort((a, b) => Number(a) - Number(b)) // Ensure numeric order
            .map((key) => data[key]);

          setRatings(sortedAnswers);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };