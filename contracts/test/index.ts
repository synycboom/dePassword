import { expect } from "chai";
import { ethers } from "hardhat";
import { DePassword, DePassword__factory } from "../typechain";

type Credential = {
  name: string;
  website: string;
  maskedUsername: string;
  encryptedUsername: string;
  encryptedPassword: string;
};

type File = {
  name: string;
  fileName: string;
  fileType: string;
  swarmReference: string;
}

describe("DePassword", function () {
  let dePassword: DePassword;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    const dePasswordFactory = await ethers.getContractFactory("DePassword", deployer) as DePassword__factory;

    dePassword = await dePasswordFactory.deploy();
  });

  function compare(credentialA: Credential, credentialB: Credential) {
    expect(credentialB.name).to.eq(credentialA.name);
    expect(credentialB.website).to.eq(credentialA.website);
    expect(credentialB.maskedUsername).to.eq(credentialA.maskedUsername);
    expect(credentialB.encryptedUsername).to.eq(credentialA.encryptedUsername);
    expect(credentialB.encryptedPassword).to.eq(credentialA.encryptedPassword);
  }

  function compareFile(fileA: File, fileB: File) {
    expect(fileA.name).to.eq(fileB.name);
    expect(fileA.swarmReference).to.eq(fileB.swarmReference);
  }

  describe("Two users are using the contract", () => {
    context("When listing empty credentials", () => {
      it("should work correctly", async () => {
        const [userA] = await ethers.getSigners();
        const credentials = await dePassword.connect(userA).listCredentials();

        expect(credentials.length).to.eq(0);
      });
    });

    context("When listing empty files", () => {
      it("should work correctly", async () => {
        const [userA] = await ethers.getSigners();
        const files = await dePassword.connect(userA).listFiles();

        expect(files.length).to.eq(0);
      });
    });

    context("When adding and listing credentials", () => {
      it("should work correctly", async () => {
        const [userA, userB] = await ethers.getSigners();
        const credentialA = {
          name: "some-site-1",
          website: "https://some-site-1.com",
          maskedUsername: "a************b",
          encryptedUsername: "#$%@#$@#$@#",
          encryptedPassword: "@##$^$%^$%^",
        };
        const credentialB = {
          name: "some-site-2",
          website: "https://some-site-2.com",
          maskedUsername: "c************d",
          encryptedUsername: "*(($*&%#$&*^%",
          encryptedPassword: "()&(&#$($%&",
        };

        await dePassword.connect(userA).addCredential(credentialA);
        await dePassword.connect(userB).addCredential(credentialB);

        const listA = await dePassword.connect(userA).listCredentials();
        const listB = await dePassword.connect(userB).listCredentials();

        expect(listA.length).to.eq(1);
        compare(listA[0], credentialA);

        expect(listB.length).to.eq(1);
        compare(listB[0], credentialB);
      });
    });

    context("When adding and listing files", () => {
      it("should work correctly", async () => {
        const [userA, userB] = await ethers.getSigners();
        const fileA = {
          name: 'file-A',
          fileName: "test.png",
          fileType: "image/png",
          swarmReference: 'A',
        };
        const fileB = {
          name: 'file-B',
          fileName: "test.png",
          fileType: "image/png",
          swarmReference: 'B',
        };

        await dePassword.connect(userA).addFile(fileA);
        await dePassword.connect(userB).addFile(fileB);

        const listA = await dePassword.connect(userA).listFiles();
        const listB = await dePassword.connect(userB).listFiles();

        expect(listA.length).to.eq(1);
        compareFile(listA[0], fileA);

        expect(listB.length).to.eq(1);
        compareFile(listB[0], fileB);
      });
    });

    context("When adding and updating credentials", () => {
      it("should revert if the index is out of bound", async () => {
        const [userA] = await ethers.getSigners();
        const credentialA = {
          name: "some-site-1",
          website: "https://some-site-1.com",
          maskedUsername: "a************b",
          encryptedUsername: "#$%@#$@#$@#",
          encryptedPassword: "@##$^$%^$%^",
        };

        await dePassword.connect(userA).addCredential(credentialA);
        await expect(
          dePassword.connect(userA).updateCredential(1, credentialA),
        ).to.be.revertedWith("IndexOutOfBound(1, 1)");
      });

      it("should add new credentials and update them correctly", async () => {
        const [userA, userB] = await ethers.getSigners();
        const credentialA = {
          name: "some-site-1",
          website: "https://some-site-1.com",
          maskedUsername: "a************b",
          encryptedUsername: "#$%@#$@#$@#",
          encryptedPassword: "@##$^$%^$%^",
        };
        const credentialB = {
          name: "some-site-2",
          website: "https://some-site-2.com",
          maskedUsername: "c************d",
          encryptedUsername: "*(($*&%#$&*^%",
          encryptedPassword: "()&(&#$($%&",
        };

        await dePassword.connect(userA).addCredential(credentialA);
        await dePassword.connect(userB).addCredential(credentialB);

        credentialA.name = credentialA.name + "#A";
        credentialA.website = credentialA.name + "#A";
        credentialA.maskedUsername = credentialA.name + "#A";
        credentialA.encryptedUsername = credentialA.name + "#A";
        credentialA.encryptedPassword = credentialA.name + "#A";

        credentialB.name = credentialA.name + "#B";
        credentialB.website = credentialA.name + "#B";
        credentialB.maskedUsername = credentialA.name + "#B";
        credentialB.encryptedUsername = credentialA.name + "#B";
        credentialB.encryptedPassword = credentialA.name + "#B";

        await dePassword.connect(userA).updateCredential(0, credentialA);
        await dePassword.connect(userB).updateCredential(0, credentialB);

        const listA = await dePassword.connect(userA).listCredentials();
        const listB = await dePassword.connect(userB).listCredentials();

        expect(listA.length).to.eq(1);
        compare(listA[0], credentialA);

        expect(listB.length).to.eq(1);
        compare(listB[0], credentialB);
      })
    });

    context("When adding and deleting credentials", () => {
      it("should revert if the index is out of bound", async () => {
        const [userA] = await ethers.getSigners();
        const credentialA = {
          name: "some-site-1",
          website: "https://some-site-1.com",
          maskedUsername: "a************b",
          encryptedUsername: "#$%@#$@#$@#",
          encryptedPassword: "@##$^$%^$%^",
        };

        await dePassword.connect(userA).addCredential(credentialA);
        await expect(
          dePassword.connect(userA).deleteCredential(1),
        ).to.be.revertedWith("IndexOutOfBound(1, 1)");
      });

      it("should add new credentials and update them correctly", async () => {
        const [userA, userB] = await ethers.getSigners();
        const credentialA = {
          name: "some-site-1",
          website: "https://some-site-1.com",
          maskedUsername: "a************b",
          encryptedUsername: "#$%@#$@#$@#",
          encryptedPassword: "@##$^$%^$%^",
        };
        const credentialB = {
          name: "some-site-2",
          website: "https://some-site-2.com",
          maskedUsername: "c************d",
          encryptedUsername: "*(($*&%#$&*^%",
          encryptedPassword: "()&(&#$($%&",
        };

        await dePassword.connect(userA).addCredential(credentialA);
        await dePassword.connect(userB).addCredential(credentialB);

        await dePassword.connect(userA).deleteCredential(0);
        await dePassword.connect(userB).deleteCredential(0);

        const listA = await dePassword.connect(userA).listCredentials();
        const listB = await dePassword.connect(userB).listCredentials();

        expect(listA.length).to.eq(0);
        expect(listB.length).to.eq(0);
      })
    });

    context("When adding and deleting files", () => {
      it("should revert if the index is out of bound", async () => {
        const [userA] = await ethers.getSigners();
        const fileA = {
          name: "file-A",
          fileName: "test.png",
          fileType: "image/png",
          swarmReference: "A",
        };

        await dePassword.connect(userA).addFile(fileA);
        await expect(
          dePassword.connect(userA).deleteFile(1),
        ).to.be.revertedWith("IndexOutOfBound(1, 1)");
      });

      it("should add new credentials and update them correctly", async () => {
        const [userA, userB] = await ethers.getSigners();
        const fileA = {
          name: "file-A",
          fileName: "test.png",
          fileType: "image/png",
          swarmReference: "A",
        };
        const fileB = {
          name: "file-B",
          fileName: "test.png",
          fileType: "image/png",
          swarmReference: "B",
        };

        await dePassword.connect(userA).addFile(fileA);
        await dePassword.connect(userB).addFile(fileB);

        await dePassword.connect(userA).deleteFile(0);
        await dePassword.connect(userB).deleteFile(0);

        const listA = await dePassword.connect(userA).listFiles();
        const listB = await dePassword.connect(userB).listFiles();

        expect(listA.length).to.eq(0);
        expect(listB.length).to.eq(0);
      })
    });
  });
});
